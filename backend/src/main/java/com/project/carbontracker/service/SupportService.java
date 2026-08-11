package com.project.carbontracker.service;

import com.project.carbontracker.dto.SupportRequest;
import com.project.carbontracker.dto.SupportResponse;
import com.project.carbontracker.enums.TicketStatus;

import java.util.List;

public interface SupportService {

    SupportResponse createTicket(SupportRequest request);

    List<SupportResponse> getUserTickets(Long userId);

    SupportResponse getTicketById(Long ticketId);

    List<SupportResponse> getAllTickets();

    SupportResponse replyToTicket(Long ticketId, String reply);

    SupportResponse updateTicketStatus(Long ticketId, TicketStatus status);

    void deleteTicket(Long ticketId);
}