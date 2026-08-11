package com.project.carbontracker.service;

import com.project.carbontracker.dto.NotificationResponse;

import java.util.List;

public interface NotificationService {

    NotificationResponse createNotification(
            Long userId,
            String title,
            String message
    );

    List<NotificationResponse> getUserNotifications(Long userId);

    long getUnreadCount(Long userId);

    NotificationResponse markAsRead(Long notificationId);

    void markAllAsRead(Long userId);
}