package com.project.carbontracker.service;

import com.project.carbontracker.dto.ActivityRequest;
import com.project.carbontracker.dto.AnalyticsResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    private final BadgeService badgeService;

    private final GoalService goalService;


    // =========================================================
    // ADD ACTIVITY
    // =========================================================

    public Activity addActivity(ActivityRequest request) {

        double emission =
                calculateEmission(
                        request.getCategory(),
                        request.getQuantity()
                );

        int ecoPoints =
                calculateEcoPoints(emission);


        Activity activity =
                Activity.builder()
                        .userId(request.getUserId())
                        .category(request.getCategory())
                        .activityType(request.getActivityType())
                        .quantity(request.getQuantity())
                        .unit(request.getUnit())
                        .notes(request.getNotes())
                        .activityDate(request.getActivityDate())
                        .emission(emission)
                        .ecoPoints(ecoPoints)
                        .createdAt(LocalDateTime.now())
                        .build();


        Activity savedActivity =
                activityRepository.save(activity);


        // Update Goal Progress
        goalService.refreshUserGoals(
                savedActivity.getUserId()
        );


        // Update Badges
        badgeService.recalculateBadges(
                savedActivity.getUserId()
        );


        return savedActivity;
    }


    // =========================================================
    // ACTIVITY HISTORY
    // =========================================================

    public List<Activity> getUserActivities(Long userId) {

        return activityRepository.findByUserId(userId);
    }


    // =========================================================
    // DASHBOARD
    // =========================================================

    public Map<String, Object> getDashboardData(Long userId) {

        List<Activity> activities =
                activityRepository.findByUserId(userId);


        double totalEmission =
                Math.round(
                        activities.stream()
                                .mapToDouble(a ->
                                        a.getEmission() == null
                                                ? 0
                                                : a.getEmission()
                                )
                                .sum()
                                * 100.0
                ) / 100.0;


        int totalPoints =
                activities.stream()
                        .mapToInt(a ->
                                a.getEcoPoints() == null
                                        ? 0
                                        : a.getEcoPoints()
                        )
                        .sum();


        // Refresh goals
        goalService.refreshUserGoals(userId);


        // Get user's goals
        var goals =
                goalService.getUserGoals(userId);


        double progress = 0;


        if (!goals.isEmpty()) {

            // First goal is used for dashboard
            progress =
                    goals.get(0).getProgress();
        }


        Map<String, Object> data =
                new LinkedHashMap<>();


        data.put(
                "totalEmission",
                totalEmission
        );

        data.put(
                "totalPoints",
                totalPoints
        );

        data.put(
                "totalActivities",
                activities.size()
        );

        data.put(
                "progress",
                progress
        );


        return data;
    }


    // =========================================================
    // DAILY / WEEKLY TREND
    // =========================================================

    public Map<String, Double> getWeeklyTrend(
            Long userId
    ) {

        List<Activity> activities =
                activityRepository.findByUserId(userId);


        Map<String, Double> trend =
                new LinkedHashMap<>();


        for (Activity activity : activities) {

            if (activity.getActivityDate() == null ||
                    activity.getEmission() == null) {

                continue;
            }


            String date =
                    activity.getActivityDate()
                            .toString();


            trend.put(
                    date,
                    trend.getOrDefault(date, 0.0)
                            + activity.getEmission()
            );
        }


        return trend;
    }


    // =========================================================
    // CATEGORY SUMMARY
    // =========================================================

    public Map<String, Double> getCategorySummary(
            Long userId
    ) {

        List<Activity> activities =
                activityRepository.findByUserId(userId);


        Map<String, Double> summary =
                new LinkedHashMap<>();


        for (Activity activity : activities) {

            if (activity.getEmission() == null) {
                continue;
            }


            String category =
                    activity.getCategory();


            if (category == null ||
                    category.isBlank()) {

                category = "Other";
            }


            summary.put(
                    category,
                    summary.getOrDefault(
                            category,
                            0.0
                    ) + activity.getEmission()
            );
        }


        return summary;
    }


    // =========================================================
    // ANALYTICS
    // =========================================================

    public AnalyticsResponse getAnalytics(
            Long userId,
            String filter
    ) {

        List<Activity> activities =
                activityRepository.findByUserId(userId);


        Map<String, Double> trendMap =
                new LinkedHashMap<>();


        Map<String, Double> categoryMap =
                new LinkedHashMap<>();


        for (Activity activity : activities) {

            if (activity == null ||
                    activity.getEmission() == null ||
                    activity.getActivityDate() == null) {

                continue;
            }


            LocalDate date =
                    activity.getActivityDate();


            String key;


            if ("weekly".equalsIgnoreCase(filter)) {

                key =
                        "Week " +
                                date.get(
                                        WeekFields.ISO
                                                .weekOfWeekBasedYear()
                                );

            } else if (
                    "monthly".equalsIgnoreCase(filter)
            ) {

                key =
                        date.getMonth()
                                .toString()
                                .substring(0, 1)
                                .toUpperCase()
                                +
                                date.getMonth()
                                        .toString()
                                        .substring(1, 3)
                                        .toLowerCase();

            } else {

                key =
                        date.toString();
            }


            trendMap.put(
                    key,
                    trendMap.getOrDefault(
                            key,
                            0.0
                    ) + activity.getEmission()
            );


            String category =
                    activity.getCategory();


            if (category == null ||
                    category.isBlank()) {

                category = "Other";
            }


            categoryMap.put(
                    category,
                    categoryMap.getOrDefault(
                            category,
                            0.0
                    ) + activity.getEmission()
            );
        }


        List<AnalyticsResponse.TrendData> trendData =
                trendMap.entrySet()
                        .stream()
                        .map(entry ->
                                new AnalyticsResponse.TrendData(
                                        entry.getKey(),
                                        Math.round(
                                                entry.getValue()
                                                        * 100.0
                                        ) / 100.0
                                )
                        )
                        .toList();


        double totalEmission =
                Math.round(
                        activities.stream()
                                .mapToDouble(a ->
                                        a.getEmission() == null
                                                ? 0
                                                : a.getEmission()
                                )
                                .sum()
                                * 100.0
                ) / 100.0;


        long totalActivities =
                activities.stream()
                        .filter(a ->
                                a.getEmission() != null)
                        .count();


        return AnalyticsResponse.builder()
                .totalEmission(totalEmission)
                .totalActivities(totalActivities)
                .trendData(trendData)
                .categoryData(categoryMap)
                .build();
    }


    // =========================================================
    // EMISSION CALCULATION
    // =========================================================

    private double calculateEmission(
            String category,
            double quantity
    ) {

        if (category == null) {

            return quantity * 0.1;
        }


        return switch (category) {

            case "Transportation" ->
                    quantity * 0.21;

            case "Energy" ->
                    quantity * 0.82;

            case "Food" ->
                    quantity * 2.5;

            case "Water" ->
                    quantity * 0.0003;

            case "Waste" ->
                    quantity * 0.5;

            default ->
                    quantity * 0.1;
        };
    }


    // =========================================================
    // ECO POINTS
    // =========================================================

    private int calculateEcoPoints(
            double emission
    ) {

        return Math.max(
                1,
                (int) (100 - emission * 5)
        );
    }
}