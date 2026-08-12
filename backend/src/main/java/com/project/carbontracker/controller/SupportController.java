package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.SupportRequest;
import com.project.carbontracker.dto.SupportResponse;
import com.project.carbontracker.service.SupportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
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