package com.project.carbontracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;

    private String email;

    private String phoneNumber;

    private Integer age;

    private String gender;

    private String password;

    private String accountType;
}