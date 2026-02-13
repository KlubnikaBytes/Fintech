package com.remnika.backend.service;

import com.remnika.backend.dto.RecipientRequest;
import com.remnika.backend.entity.Recipient;
import com.remnika.backend.entity.User;
import com.remnika.backend.repository.RecipientRepository;
import com.remnika.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecipientService {

    private final RecipientRepository recipientRepository;
    private final UserRepository userRepository;

    /**
     * Process 1.3.1 & 1.3.2: Identifies user and validates recipient details.
     * Process 1.3.3: Stores the profile in the D3 Recipient Database.
     */
    public String addRecipient(RecipientRequest request) {
        // 1.3.1 Identify Authenticated User via JWT
        // This relies on the SecurityContext populated by your JwtAuthFilter
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User session not found"));

        // 1.3.2 Validate Recipient Country & Bank
        if (request.getCountry() == null || request.getCountry().isEmpty() ||
                request.getBankName() == null || request.getBankName().isEmpty()) {
            throw new RuntimeException("Validation Failed: Country and Bank Name are required.");
        }

        // 1.3.3 Store Recipient Profile in D3 Store
        Recipient recipient = Recipient.builder()
                .user(user)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .country(request.getCountry())
                .bankName(request.getBankName())
                .accountNumber(request.getAccountNumber())
                .build();

        recipientRepository.save(recipient);
        return "Recipient profile stored successfully!";
    }

    /**
     * Retrieves the list of recipients stored in D3 for the authenticated user.
     */
    public List<Recipient> getMyRecipients() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return recipientRepository.findByUserId(user.getId());
    }
}