package com.remnika.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // Matches DLT Template ID: 1207176519195448680
    // Template Name: KLUB_OTP
    public void sendOtpEmail(String toEmail, String otp) {
        // DLT Template Logic
        String templateContent = "Dear Customer, " + otp + " is your OTP for login at Klubnika. Do not share this with anyone. KLUBNIKA";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("klubnikabytes@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Your Klubnika Verification Code");
        message.setText(templateContent);

        mailSender.send(message);
        System.out.println("OTP Email sent to " + toEmail);
    }

    // Future: Add SMS Logic here using the phoneNumber
}