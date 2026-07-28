package com.project.carbontracker.controller;

import com.project.carbontracker.dto.LeaderboardResponse;
import com.project.carbontracker.service.LeaderboardService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @PostConstruct
    public void init(){
        System.out.println("LeaderboardController Loaded");
    }

    @GetMapping
    public List<LeaderboardResponse> getLeaderboard() {
        return leaderboardService.getLeaderboard();
    }
}