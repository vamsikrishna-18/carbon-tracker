package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.BadgeResponse;
import com.project.carbontracker.service.BadgeService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/badges")
@RequiredArgsConstructor
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