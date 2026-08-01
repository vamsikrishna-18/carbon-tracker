package com.project.carbontracker.service;

import com.project.carbontracker.dto.AnalyticsResponse;
import com.project.carbontracker.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AnalyticsRepository analyticsRepository;

    public AnalyticsResponse getAnalytics(String filter) {

        LocalDateTime startDate;
        LocalDateTime endDate = LocalDateTime.now();

        startDate = switch (filter.toLowerCase()) {
            case "weekly" -> LocalDate.now().minusDays(6).atStartOfDay();
            case "monthly" -> LocalDate.now().withDayOfMonth(1).atStartOfDay();
            default -> LocalDate.now().atStartOfDay();
        };

        Double totalEmission =
                analyticsRepository.getTotalEmission(startDate, endDate);

        Long totalActivities =
                analyticsRepository.getTotalActivities(startDate, endDate);

        List<Object[]> categoryResult =
                analyticsRepository.getCategoryAnalytics(startDate, endDate);
        List<Object[]> trendResult =
                analyticsRepository.getTrendAnalytics(startDate, endDate);

        Map<String, Double> trendData = new HashMap<>();

        for (Object[] row : trendResult) {

            LocalDateTime date = (LocalDateTime) row[0];

            Double emission = ((Number) row[1]).doubleValue();

            String key = switch (filter.toLowerCase()) {
                case "weekly" -> "Week " + date.getDayOfMonth() / 7;
                case "monthly" -> date.getMonth().toString();
                default -> date.toLocalDate().toString();
            };

            trendData.put(
                    key,
                    trendData.getOrDefault(key, 0.0) + emission
            );
        }

        Map<String, Double> categoryData = new HashMap<>();

        for (Object[] row : categoryResult) {

            String category = (String) row[0];

            Double emission = ((Number) row[1]).doubleValue();

            categoryData.put(category, emission);
        }

        return AnalyticsResponse.builder()
                .totalEmission(totalEmission)
                .totalActivities(totalActivities)
                .categoryData(categoryData)
                .build();
    }

}