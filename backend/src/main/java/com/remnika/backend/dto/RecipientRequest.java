package com.remnika.backend.dto; // Check this line matches your folder!

import lombok.Data;

@Data
public class RecipientRequest {
    private String firstName;
    private String lastName;
    private String country;
    private String bankName;
    private String accountNumber;
}