package com.remnika.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "sessions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String token;       // The JWT Token issued
    private String deviceId;    // Device ID from the request
    private String ipAddress;   // (Optional) We can capture IP later
    private LocalDateTime loginTime;
    private LocalDateTime expiresAt;

    private boolean isActive;   // To handle "Logout" later
}