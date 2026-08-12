package com.project.carbontracker.dto;

import com.project.carbontracker.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private Integer age;
    private String gender;
    private String googleId;
    private String authProvider;
    private String role;
    private boolean temporaryPassword;
    private LocalDateTime createdAt;

    // Convenience factory so the service layer can do
    // UserResponse.from(user) instead of building it field by field.
    // Deliberately omits `password` — this DTO is what goes out
    // over the wire, so the hash should never end up in it.
    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .age(user.getAge())
                .gender(user.getGender())
                .googleId(user.getGoogleId())
                .authProvider(user.getAuthProvider())
                .role(user.getRole() != null ? user.getRole().name() : null)
                .temporaryPassword(user.isTemporaryPassword())
                .createdAt(user.getCreatedAt())
                .build();
    }
}