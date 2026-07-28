package com.project.carbontracker.controller;

import com.project.carbontracker.dto.ActivityRequest;
import com.project.carbontracker.dto.AnalyticsResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activity")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/add")
    public Activity addActivity(@RequestBody ActivityRequest request) {
        return activityService.addActivity(request);
    }

    @GetMapping("/{userId}")
    public List<Activity> getActivities(@PathVariable Long userId) {
        return activityService.getUserActivities(userId);
    }

    @GetMapping("/dashboard/{userId}")
    public Map<String, Object> getDashboard(@PathVariable Long userId) {
        return activityService.getDashboardData(userId);
    }
    @GetMapping("/weekly-trend/{userId}")
    public Map<String, Double> getWeeklyTrend(
            @PathVariable Long userId) {

        return activityService.getWeeklyTrend(userId);
    }
    @GetMapping("/analytics/{userId}")
    public ResponseEntity<AnalyticsResponse> getAnalytics(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "daily") String filter
    ) {
        return ResponseEntity.ok(
                activityService.getAnalytics(userId, filter)
        );
    }
    @GetMapping("/category-summary/{userId}")
    public Map<String, Double> getCategorySummary(
            @PathVariable Long userId) {

        return activityService
                .getCategorySummary(userId);
    }
}