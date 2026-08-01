package com.project.carbontracker.service;

import com.project.carbontracker.dto.BadgeResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.entity.Badge;
import com.project.carbontracker.entity.UserBadge;
import com.project.carbontracker.repository.ActivityRepository;
import com.project.carbontracker.repository.BadgeRepository;
import com.project.carbontracker.repository.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final ActivityRepository activityRepository;

    @Transactional
    public void recalculateBadges(Long userId) {

        List<Activity> activities = activityRepository.findByUserId(userId);

        int totalPoints = activities.stream()
                .mapToInt(a -> a.getEcoPoints() == null ? 0 : a.getEcoPoints())
                .sum();

        // Delete old badges
        userBadgeRepository.deleteByUserId(userId);

        List<Badge> badges = badgeRepository.findAll();

        for (Badge badge : badges) {

            if (totalPoints >= badge.getPointsRequired()) {

                UserBadge userBadge = UserBadge.builder()
                        .userId(userId)
                        .badge(badge)
                        .earnedDate(LocalDate.now())
                        .build();

                userBadgeRepository.save(userBadge);
            }
        }
    }

    public List<BadgeResponse> getUserBadges(Long userId) {

        List<UserBadge> userBadges = userBadgeRepository.findByUserId(userId);

        List<BadgeResponse> response = new ArrayList<>();

        for (UserBadge ub : userBadges) {

            response.add(
                    BadgeResponse.builder()
                            .id(ub.getBadge().getId())
                            .name(ub.getBadge().getName())
                            .description(ub.getBadge().getDescription())
                            .icon(ub.getBadge().getIcon())
                            .earnedDate(ub.getEarnedDate())
                            .build()
            );
        }

        return response;
    }
}