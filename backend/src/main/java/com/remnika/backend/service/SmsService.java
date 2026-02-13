package com.remnika.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class SmsService {

    @Value("${remnika.sms.api-key}")
    private String apiKey;

    @Value("${remnika.sms.template-name}")
    private String templateName;

    public void sendOtpSms(String phoneNumber, String otp) {
        // 2Factor API Format: https://2factor.in/API/V1/{api_key}/SMS/{phone_number}/{otp}/{template_name}
        String url = "https://2factor.in/API/V1/" + apiKey + "/SMS/" + phoneNumber + "/" + otp + "/" + templateName;

        try {
            RestTemplate restTemplate = new RestTemplate();
            // Fire the request
            String response = restTemplate.getForObject(url, String.class);
            log.info("SMS sent to {}: Response: {}", phoneNumber, response);
        } catch (Exception e) {
            log.error("Failed to send SMS to {}: {}", phoneNumber, e.getMessage());
            throw new RuntimeException("Failed to send SMS OTP. Please try Email.");
        }
    }
}