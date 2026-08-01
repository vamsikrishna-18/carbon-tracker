package com.project.carbontracker.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String category;

    private String activityType;

    private Double quantity;

    private String unit;

    private String notes;

    private LocalDate activityDate;

    private Double emission;

    private Integer ecoPoints;

    private LocalDateTime createdAt;
}