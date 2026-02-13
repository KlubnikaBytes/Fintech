package com.remnika.backend.controller;

import com.remnika.backend.dto.LoginRequest;
import com.remnika.backend.dto.RegisterRequest;
import com.remnika.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import jakarta.servlet.http.HttpServletRequest; // Add this import

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest request) {
        String response = userService.registerUser(request);
        return ResponseEntity.ok(response);
    }

    // New Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String response = userService.loginUser(request);
        return ResponseEntity.ok(response);
    }

    // Updated Verify Endpoint (Supports Phone or Email)
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String phone = request.get("phoneNumber");
        String otp = request.get("otp");

        String token;

        // Determine if we are verifying via Phone or Email
        if (phone != null && !phone.isEmpty()) {
            token = userService.verifyOtp(phone, otp, true);
        } else {
            token = userService.verifyOtp(email, otp, false);
        }

        return ResponseEntity.ok(Map.of("message", "Login Successful!", "token", token));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userService.logoutUser(token);
            return ResponseEntity.ok("Logged out successfully. Session invalidated.");
        }

        return ResponseEntity.badRequest().body("No active session found in headers.");
    }
}
