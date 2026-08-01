package com.project.carbontracker.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private Integer age;
    private String gender;
    private String password;

    // Getters and Setters
}