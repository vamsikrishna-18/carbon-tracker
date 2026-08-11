package com.project.carbontracker.controller;

import com.project.carbontracker.dto.RecommendationResponse;
import com.project.carbontracker.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public List<RecommendationResponse> getRecommendations(
            @PathVariable Long userId
    ) {
        return recommendationService.getRecommendations(userId);
    }
}