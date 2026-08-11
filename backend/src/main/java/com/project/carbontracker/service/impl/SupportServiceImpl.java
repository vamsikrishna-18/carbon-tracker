package com.project.carbontracker.service.impl;

import com.project.carbontracker.dto.SupportRequest;
import com.project.carbontracker.dto.SupportResponse;
import com.project.carbontracker.entity.SupportTicket;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.enums.TicketPriority;
import com.project.carbontracker.enums.TicketStatus;
import com.project.carbontracker.repository.SupportTicketRepository;
import com.project.carbontracker.repository.UserRepository;
import com.project.carbontracker.service.SupportService;
import com.project.carbontracker.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService {

    private final SupportTicketRepository supportTicketRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    @Override
    public SupportResponse createTicket(SupportRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        SupportTicket ticket = SupportTicket.builder()
                .user(user)
                .subject(request.getSubject())
                .category(request.getCategory())
                .description(request.getDescription())
                .status(TicketStatus.OPEN)
                .priority(TicketPriority.MEDIUM)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        supportTicketRepository.save(ticket);

        return mapToResponse(ticket);
    }

    @Override
    public List<SupportResponse> getUserTickets(Long userId) {

        return supportTicketRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SupportResponse getTicketById(Long ticketId) {

        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        return mapToResponse(ticket);
    }

    @Override
    public List<SupportResponse> getAllTickets() {

        return supportTicketRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public SupportResponse replyToTicket(Long ticketId, String reply) {

        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setAdminReply(reply);

        if (ticket.getStatus() == TicketStatus.OPEN) {
            ticket.setStatus(TicketStatus.IN_PROGRESS);
        }
        ticket.setUpdatedAt(LocalDateTime.now());

        supportTicketRepository.save(ticket);
        notificationService.createNotification(
                ticket.getUser().getId(),
                "Support Ticket Updated",
                "Your ticket \"" + ticket.getSubject() + "\" has received a reply from the admin."
        );

        return mapToResponse(ticket);
    }

    @Override
    public SupportResponse updateTicketStatus(Long ticketId, TicketStatus status) {

        System.out.println("Before : " + status);

        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        System.out.println("Old Status : " + ticket.getStatus());

        ticket.setStatus(status);

        supportTicketRepository.save(ticket);
        notificationService.createNotification(
                ticket.getUser().getId(),
                "Ticket Status Updated",
                "Your ticket \"" + ticket.getSubject()
                        + "\" status has been changed to "
                        + status + "."
        );

        System.out.println("New Status : " + ticket.getStatus());

        return mapToResponse(ticket);
    }
    @Override
    public void deleteTicket(Long ticketId) {

        if (!supportTicketRepository.existsById(ticketId)) {
            throw new RuntimeException("Ticket not found");
        }

        supportTicketRepository.deleteById(ticketId);
    }

    private SupportResponse mapToResponse(SupportTicket ticket) {

        return SupportResponse.builder()
                .id(ticket.getId())
                .userId(ticket.getUser().getId())
                .userName(ticket.getUser().getFullName())
                .subject(ticket.getSubject())
                .category(ticket.getCategory())
                .description(ticket.getDescription())
                .status(ticket.getStatus())
                .priority(ticket.getPriority())
                .adminReply(ticket.getAdminReply())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .resolvedAt(ticket.getResolvedAt())
                .build();
    }
}