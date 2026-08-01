package com.project.carbontracker.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class GoalResponse {

    private Long id;

    private double targetPercentage;

    private double initialEmission;

    private double currentEmission;

    private double progress;

    private String status;

    private LocalDate startDate;

    private LocalDate endDate;
}