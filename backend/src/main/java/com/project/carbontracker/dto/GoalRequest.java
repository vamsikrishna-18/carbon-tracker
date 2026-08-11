package com.project.carbontracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class GoalRequest {

    private Long userId;

    private double targetPercentage;

    private LocalDate endDate;
}