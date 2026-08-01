package com.project.carbontracker.controller;

import com.project.carbontracker.dto.AnalyticsResponse;
import com.project.carbontracker.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public AnalyticsResponse getAnalytics(
            @RequestParam(defaultValue = "daily") String filter
    ) {

        return analyticsService.getAnalytics(filter);

    }

}