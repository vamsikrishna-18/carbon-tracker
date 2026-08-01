package com.project.carbontracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who created the goal
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    // Example: reduce carbon by 20%
    private double targetPercentage;


    // Carbon emission at goal creation time
    private double initialEmission;


    // Current emission after activities
    private double currentEmission;


    // Calculated progress
    private double progress;


    // ON_TRACK, AT_RISK, COMPLETED
    private String status;


    private LocalDate startDate;

    private LocalDate endDate;
}