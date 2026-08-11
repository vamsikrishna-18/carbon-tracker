package com.project.carbontracker.service;

import com.project.carbontracker.dto.NotificationResponse;
import com.project.carbontracker.entity.Notification;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.NotificationRepository;
import com.project.carbontracker.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;


    // ============================================================
    // CREATE NOTIFICATION
    // ============================================================

    @Override
    public NotificationResponse createNotification(
            Long userId,
            String title,
            String message
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .isRead(false)
                .build();

        Notification saved =
                notificationRepository.save(notification);

        return convertToResponse(saved);
    }


    // ============================================================
    // GET USER NOTIFICATIONS
    // ============================================================

    @Override
    public List<NotificationResponse> getUserNotifications(
            Long userId
    ) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // ============================================================
    // GET UNREAD COUNT
    // ============================================================

    @Override
    public long getUnreadCount(Long userId) {

        return notificationRepository
                .countByUserIdAndIsReadFalse(userId);
    }


    // ============================================================
    // MARK ONE AS READ
    // ============================================================

    @Override
    @Transactional
    public NotificationResponse markAsRead(
            Long notificationId
    ) {

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notification not found"
                                )
                        );

        notification.setIsRead(true);

        Notification updated =
                notificationRepository.save(notification);

        return convertToResponse(updated);
    }


    // ============================================================
    // MARK ALL AS READ
    // ============================================================

    @Override
    @Transactional
    public void markAllAsRead(Long userId) {

        List<Notification> notifications =
                notificationRepository
                        .findByUserIdOrderByCreatedAtDesc(userId);

        for (Notification notification : notifications) {

            if (!Boolean.TRUE.equals(notification.getIsRead())) {
                notification.setIsRead(true);
            }
        }

        notificationRepository.saveAll(notifications);
    }


    // ============================================================
    // CONVERT ENTITY → DTO
    // ============================================================

    private NotificationResponse convertToResponse(
            Notification notification
    ) {

        return new NotificationResponse(
                notification.getId(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getIsRead(),
                notification.getCreatedAt()
        );
    }
}