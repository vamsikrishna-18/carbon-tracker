package com.project.carbontracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupportRequest {

    private Long userId;

    private String subject;

    private String category;

    private String description;
}