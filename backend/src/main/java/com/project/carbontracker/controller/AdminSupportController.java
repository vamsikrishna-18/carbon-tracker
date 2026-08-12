package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.SupportResponse;
import com.project.carbontracker.enums.TicketStatus;
import com.project.carbontracker.service.SupportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/support")
@RequiredArgsConstructor
public class AdminSupportController {

    private final SupportService supportService;

    @GetMapping
    public ResponseEntity<List<SupportResponse>> getAllTickets() {

        return ResponseEntity.ok(
                supportService.getAllTickets()
        );
    }

    @PutMapping("/reply/{ticketId}")
    public ResponseEntity<SupportResponse> replyToTicket(
            @PathVariable Long ticketId,
            @RequestBody String reply) {

        return ResponseEntity.ok(
                supportService.replyToTicket(ticketId, reply)
        );
    }

    @PutMapping("/status/{ticketId}")
    public ResponseEntity<SupportResponse> updateStatus(
            @PathVariable Long ticketId,
            @RequestParam TicketStatus status) {

        return ResponseEntity.ok(
                supportService.updateTicketStatus(ticketId, status)
        );
    }

    @DeleteMapping("/{ticketId}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable Long ticketId) {

        supportService.deleteTicket(ticketId);

        return ResponseEntity.ok("Ticket deleted successfully");
    }
}