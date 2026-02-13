package com.remnika.backend.service;

import com.remnika.backend.config.JwtUtils;
import com.remnika.backend.dto.LoginRequest;
import com.remnika.backend.dto.RegisterRequest;
import com.remnika.backend.entity.Session;
import com.remnika.backend.entity.User;
import com.remnika.backend.repository.SessionRepository;
import com.remnika.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository; // Added for Session Storage
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final SmsService smsService;
    private final JwtUtils jwtUtils;

    // --- 1. Registration Logic ---
    public String registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken!");
        }
        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new RuntimeException("Phone number already in use!");
        }

        String otp = generateOtp();

        User user = User.builder()
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .deviceId(request.getDeviceId())
                .otp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(10))
                .isVerified(false)
                .build();

        userRepository.save(user);

        // Helper to send OTP based on choice
        sendOtpToUser(user, request.getOtpMethod());

        return "OTP sent for verification.";
    }

    // --- 2. Login Logic ---
    public String loginUser(LoginRequest request) {
        User user;

        // Find user by Email OR Phone
        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found with this email"));
        } else if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            user = userRepository.findByPhoneNumber(request.getPhoneNumber())
                    .orElseThrow(() -> new RuntimeException("User not found with this phone number"));
        } else {
            throw new RuntimeException("Please provide Email or Phone Number");
        }

        // 1.2.1 Validate Credentials (Password Check)
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password!");
        }

        // Generate NEW OTP for 2-Factor Login
        String otp = generateOtp();
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
        userRepository.save(user);

        // Send OTP based on what they used to login (Input Mirroring)
        if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            smsService.sendOtpSms(user.getPhoneNumber(), otp);
            return "OTP sent to your Phone (" + user.getPhoneNumber() + ")";
        } else {
            emailService.sendOtpEmail(user.getEmail(), otp);
            return "OTP sent to your Email (" + user.getEmail() + ")";
        }
    }

    // --- 3. Verify OTP & Generate Token (Updated with Session Store) ---
    public String verifyOtp(String identifier, String otp, boolean isPhone) {
        User user;

        // Find user based on whether input was Phone or Email
        if (isPhone) {
            user = userRepository.findByPhoneNumber(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        } else {
            user = userRepository.findByEmail(identifier)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        // Validate OTP
        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP Expired");
        }

        // OTP Validated - Clear it
        user.setVerified(true);
        user.setOtp(null);
        userRepository.save(user);

        // 1.2.2 Generate Auth Token (JWT)
        String token = jwtUtils.generateJwtToken(user.getEmail());

        // 1.2.3 Store Session Metadata (The Missing Piece)
        createSession(user, token);

        return token;
    }

    // --- Helper Methods ---

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private void sendOtpToUser(User user, String method) {
        if ("PHONE".equalsIgnoreCase(method)) {
            smsService.sendOtpSms(user.getPhoneNumber(), user.getOtp());
        } else {
            emailService.sendOtpEmail(user.getEmail(), user.getOtp());
        }
    }

    // New Helper: Record the Session in Database
    private void createSession(User user, String token) {
        Session session = Session.builder()
                .user(user)
                .token(token)
                .deviceId(user.getDeviceId()) // Captured during Register
                .loginTime(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusHours(24)) // Should match JWT expiry
                .isActive(true)
                .build();

        sessionRepository.save(session);
    }
}