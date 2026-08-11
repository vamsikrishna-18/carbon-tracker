package com.project.carbontracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(
            nullable = true,
            unique = true,
            length = 10
    )
    private String phoneNumber;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = true)
    private String gender;

    @Column(nullable = true)
    private String password;

    @Column(
            nullable = true,
            unique = true
    )
    private String googleId;

    @Column(nullable = false)
    @Builder.Default
    private String authProvider = "LOCAL";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.USER;

    @Column(nullable = false)
    @Builder.Default
    private boolean temporaryPassword = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}