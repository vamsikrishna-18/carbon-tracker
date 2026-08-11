package com.project.carbontracker.dto;

import lombok.Data;

@Data
public class CreateEmployeeRequest {

    private String fullName;
    private String email;
    private String phoneNumber;
    private Integer age;
    private String gender;
}