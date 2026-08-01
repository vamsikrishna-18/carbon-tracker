package com.project.carbontracker.controller;

import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.carbontracker.repository.ActivityRepository;
import com.project.carbontracker.entity.Activity;

import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private ActivityRepository activityRepository;
    @PostMapping("/register")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterRequest request) {
        UserService.Result result = userService.registerAdmin(request);
        return ResponseEntity.status(result.status()).body(result.message());
    }
    @GetMapping("/activities")
    public ResponseEntity<List<Activity>> getAllActivities() {

        List<Activity> activities =
                activityRepository.findAll();

        return ResponseEntity.ok(activities);
    }
    @GetMapping("/analytics-details")
    public ResponseEntity<Map<String, Object>> getAnalyticsDetails(
            @RequestParam(defaultValue = "daily") String filter
    ) {
        System.out.println("Selected Filter: " + filter);
        List<Activity> activities = activityRepository.findAll();

        Map<String, Double> trendMap = new LinkedHashMap<>();
        Map<String, Double> categoryMap = new HashMap<>();

        for (Activity activity : activities) {

            if (activity.getEmission() == null || activity.getCreatedAt() == null) {
                continue;
            }

            String date;

            if (filter.equalsIgnoreCase("daily")) {

                date = activity.getCreatedAt()
                        .toLocalDate()
                        .toString();

            }
            else if (filter.equalsIgnoreCase("weekly")) {

                LocalDate activityDate = activity.getCreatedAt().toLocalDate();

                WeekFields weekFields = WeekFields.ISO;

                int week = activityDate.get(weekFields.weekOfWeekBasedYear());

                int year = activityDate.getYear();

                date = "Week " + week + " - " + year;

            }
            else {

                LocalDate activityDate = activity.getCreatedAt().toLocalDate();

                date = activityDate.getMonth().toString() + " " + activityDate.getYear();

            }

            trendMap.put(
                    date,
                    trendMap.getOrDefault(date, 0.0)
                            + activity.getEmission()
            );

            String category = activity.getCategory();

            if (category == null || category.isBlank()) {
                category = "Other";
            }

            categoryMap.put(
                    category,
                    categoryMap.getOrDefault(category, 0.0)
                            + activity.getEmission()
            );
        }

        Map<String, Object> data = new HashMap<>();
        data.put("trendData", trendMap);
        data.put("categoryData", categoryMap);

        return ResponseEntity.ok(data);
    }
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAdminAnalytics() {

        List<Activity> activities = activityRepository.findAll();

        double totalEmission = activities.stream()
                .mapToDouble(a -> a.getEmission() != null ? a.getEmission() : 0)
                .sum();

        Map<String, Double> categoryData = new HashMap<>();

        for (Activity activity : activities) {

            String category = activity.getCategory();

            if (category == null || category.isBlank()) {
                category = "Other";
            }

            categoryData.put(
                    category,
                    categoryData.getOrDefault(category, 0.0)
                            + activity.getEmission()
            );
        }

        Map<String, Object> data = new HashMap<>();
        data.put("totalEmission", totalEmission);
        data.put("totalActivities", activities.size());
        data.put("categoryData", categoryData);

        return ResponseEntity.ok(data);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) {
        UserService.LoginResult result = userService.loginAdmin(request);

        if (result.user() == null) {
            return ResponseEntity.status(result.status())
                    .body(Map.of("message", result.message()));
        }

        return ResponseEntity.status(result.status())
                .body(Map.of("message", result.message(), "user", result.user()));
    }
}