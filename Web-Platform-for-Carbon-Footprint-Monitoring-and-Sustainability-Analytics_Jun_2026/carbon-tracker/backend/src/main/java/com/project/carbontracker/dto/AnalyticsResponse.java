package com.project.carbontracker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponse {

    private Double totalEmission;

    private Long totalActivities;

    private Map<String, Double> categoryData;

    private List<TrendData> trendData;

    public AnalyticsResponse(
            List<TrendData> trendData,
            Map<String, Double> categoryData
    ) {
        this.trendData = trendData;
        this.categoryData = categoryData;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TrendData {

        private String date;

        private Double emission;

    }
}