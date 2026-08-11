package com.project.carbontracker.controller;

import com.project.carbontracker.dto.BadgeResponse;
import com.project.carbontracker.service.BadgeService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BadgeController {

    private final BadgeService badgeService;

    @PostConstruct
    public void init() {
        System.out.println("BadgeController Loaded");
    }
    @PostMapping("/recalculate/{userId}")
    public String recalculate(@PathVariable Long userId) {

        badgeService.recalculateBadges(userId);

        return "Badges recalculated successfully";
    }
    @GetMapping("/{userId}")
    public List<BadgeResponse> getUserBadges(@PathVariable Long userId) {
        return badgeService.getUserBadges(userId);
    }
}