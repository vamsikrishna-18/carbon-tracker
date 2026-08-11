package com.project.carbontracker.dto;

import com.project.carbontracker.enums.TicketPriority;
import com.project.carbontracker.enums.TicketStatus;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupportResponse {

    private Long id;

    private Long userId;

    private String userName;

    private String subject;

    private String category;

    private String description;

    private TicketStatus status;

    private TicketPriority priority;

    private String adminReply;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime resolvedAt;
}