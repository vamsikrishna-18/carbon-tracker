package com.project.carbontracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ActivityRequest {

    private Long userId;

    private String category;

    private String activityType;

    private Double quantity;

    private String unit;

    private String notes;

    private LocalDate activityDate;
}