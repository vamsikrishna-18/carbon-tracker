package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.NotificationResponse;
import com.project.carbontracker.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;


    // ============================================================
    // GET ALL NOTIFICATIONS
    // ============================================================

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationResponse>> getNotifications(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                notificationService.getUserNotifications(userId)
        );
    }


    // ============================================================
    // GET UNREAD COUNT
    // ============================================================

    @GetMapping("/unread/{userId}")
    public ResponseEntity<Long> getUnreadCount(
            @PathVariable Long userId
    ) {

        return ResponseEntity.ok(
                notificationService.getUnreadCount(userId)
        );
    }


    // ============================================================
    // MARK ONE AS READ
    // ============================================================

    @PutMapping("/read/{notificationId}")
    public ResponseEntity<NotificationResponse> markAsRead(
            @PathVariable Long notificationId
    ) {

        return ResponseEntity.ok(
                notificationService.markAsRead(notificationId)
        );
    }


    // ============================================================
    // MARK ALL AS READ
    // ============================================================

    @PutMapping("/read-all/{userId}")
    public ResponseEntity<String> markAllAsRead(
            @PathVariable Long userId
    ) {

        notificationService.markAllAsRead(userId);

        return ResponseEntity.ok(
                "All notifications marked as read"
        );
    }
}