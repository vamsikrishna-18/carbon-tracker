package com.project.carbontracker.controller;

import com.project.carbontracker.dto.SupportRequest;
import com.project.carbontracker.dto.SupportResponse;
import com.project.carbontracker.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SupportController {

    private final SupportService supportService;

    @PostMapping("/create")
    public ResponseEntity<SupportResponse> createTicket(
            @RequestBody SupportRequest request) {

        return ResponseEntity.ok(
                supportService.createTicket(request)
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportResponse>> getUserTickets(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                supportService.getUserTickets(userId)
        );
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<SupportResponse> getTicket(
            @PathVariable Long ticketId) {

        return ResponseEntity.ok(
                supportService.getTicketById(ticketId)
        );
    }

}