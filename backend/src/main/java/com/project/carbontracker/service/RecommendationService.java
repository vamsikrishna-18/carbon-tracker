package com.project.carbontracker.service;

import com.project.carbontracker.dto.RecommendationResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final ActivityRepository activityRepository;

    public List<RecommendationResponse> getRecommendations(Long userId) {

        List<Activity> activities = activityRepository.findByUserId(userId);

        double transportation = 0;
        double energy = 0;
        double food = 0;
        double water = 0;
        double waste = 0;

        for (Activity activity : activities) {

            if (activity.getEmission() == null) {
                continue;
            }

            switch (activity.getCategory()) {

                case "Transportation" ->
                        transportation += activity.getEmission();

                case "Energy" ->
                        energy += activity.getEmission();

                case "Food" ->
                        food += activity.getEmission();

                case "Water" ->
                        water += activity.getEmission();

                case "Waste" ->
                        waste += activity.getEmission();
            }
        }

        List<RecommendationResponse> recommendations = new ArrayList<>();

        if (transportation > 20) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("Transportation")
                            .recommendation("Use public transport, cycling, or carpooling to reduce transportation emissions.")
                            .priority("HIGH")
                            .build()
            );
        }

        if (energy > 20) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("Energy")
                            .recommendation("Switch off unused appliances and use energy-efficient devices.")
                            .priority("HIGH")
                            .build()
            );
        }

        if (food > 20) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("Food")
                            .recommendation("Reduce red meat consumption and include more plant-based meals.")
                            .priority("MEDIUM")
                            .build()
            );
        }

        if (water > 5) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("Water")
                            .recommendation("Reduce water wastage and repair leaking taps.")
                            .priority("LOW")
                            .build()
            );
        }

        if (waste > 10) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("Waste")
                            .recommendation("Segregate waste and recycle whenever possible.")
                            .priority("MEDIUM")
                            .build()
            );
        }

        if (recommendations.isEmpty()) {
            recommendations.add(
                    RecommendationResponse.builder()
                            .category("General")
                            .recommendation("Excellent! Your emissions are under control. Keep maintaining eco-friendly habits.")
                            .priority("LOW")
                            .build()
            );
        }

        return recommendations;
    }
}