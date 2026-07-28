package com.project.carbontracker.service;

import com.project.carbontracker.dto.LeaderboardResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.ActivityRepository;
import com.project.carbontracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public List<LeaderboardResponse> getLeaderboard() {

        List<User> users = userRepository.findAll();

        List<LeaderboardResponse> leaderboard = new ArrayList<>();

        for (User user : users) {

            List<Activity> activities =
                    activityRepository.findByUserId(user.getId());

            double totalEmission = activities.stream()
                    .mapToDouble(a ->
                            a.getEmission() == null ? 0 : a.getEmission())
                    .sum();

            int totalPoints = activities.stream()
                    .mapToInt(a ->
                            a.getEcoPoints() == null ? 0 : a.getEcoPoints())
                    .sum();

            leaderboard.add(
                    LeaderboardResponse.builder()
                            .userId(user.getId())
                            .fullName(user.getFullName())
                            .totalEcoPoints(totalPoints)
                            .totalEmission(Math.round(totalEmission * 100.0) / 100.0)
                            .build()
            );
        }

        leaderboard.sort(
                Comparator.comparing(LeaderboardResponse::getTotalEcoPoints)
                        .reversed()
                        .thenComparing(LeaderboardResponse::getTotalEmission)
        );

        for (int i = 0; i < leaderboard.size(); i++) {
            leaderboard.get(i).setRank(i + 1);
        }

        return leaderboard;
    }
}