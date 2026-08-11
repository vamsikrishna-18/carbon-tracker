package com.project.carbontracker.service;

import com.project.carbontracker.dto.GoalRequest;
import com.project.carbontracker.dto.GoalResponse;
import com.project.carbontracker.entity.Activity;
import com.project.carbontracker.entity.Goal;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.ActivityRepository;
import com.project.carbontracker.repository.GoalRepository;
import com.project.carbontracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;


    // =========================================================
    // CREATE GOAL
    // =========================================================

    public GoalResponse createGoal(GoalRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get current total emission before creating the goal
        double currentTotalEmission =
                getTotalEmission(request.getUserId());

        Goal goal = Goal.builder()
                .user(user)
                .targetPercentage(request.getTargetPercentage())
                .initialEmission(currentTotalEmission)
                .currentEmission(currentTotalEmission)
                .progress(0)
                .status("ON_TRACK")
                .startDate(LocalDate.now())
                .endDate(request.getEndDate())
                .build();

        Goal savedGoal = goalRepository.save(goal);

        return mapToResponse(savedGoal);
    }


    // =========================================================
    // GET USER GOALS
    // =========================================================

    public List<GoalResponse> getUserGoals(Long userId) {

        List<Goal> goals = goalRepository.findByUserId(userId);

        // Refresh progress before returning
        goals.forEach(this::calculateProgress);

        return goals.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =========================================================
    // GET SINGLE GOAL PROGRESS
    // =========================================================

    public GoalResponse getGoalProgress(Long goalId) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        calculateProgress(goal);

        return mapToResponse(goal);
    }


    // =========================================================
    // UPDATE GOAL
    // =========================================================

    public GoalResponse updateGoal(
            Long goalId,
            GoalRequest request
    ) {

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() ->
                        new RuntimeException("Goal not found"));

        goal.setTargetPercentage(
                request.getTargetPercentage()
        );

        goal.setEndDate(
                request.getEndDate()
        );

        calculateProgress(goal);

        return mapToResponse(
                goalRepository.save(goal)
        );
    }


    // =========================================================
    // REFRESH ALL USER GOALS
    // =========================================================

    public void refreshUserGoals(Long userId) {

        List<Goal> goals =
                goalRepository.findByUserId(userId);

        for (Goal goal : goals) {

            calculateProgress(goal);

            goalRepository.save(goal);
        }
    }


    // =========================================================
    // CALCULATE PROGRESS
    // =========================================================

    private void calculateProgress(Goal goal) {

        double initialEmission =
                goal.getInitialEmission();

        double currentEmission =
                getTotalEmission(goal.getUser().getId());

        goal.setCurrentEmission(currentEmission);


        // Avoid division by zero
        if (initialEmission <= 0) {

            goal.setProgress(0);
            goal.setStatus("ON_TRACK");

            return;
        }


        double requiredReduction =
                initialEmission *
                        (goal.getTargetPercentage() / 100.0);


        double actualReduction =
                initialEmission - currentEmission;


        double progress;


        if (requiredReduction <= 0) {

            progress = 0;

        } else {

            progress =
                    (actualReduction /
                            requiredReduction) * 100.0;
        }


        // Keep progress between 0 and 100
        progress =
                Math.max(
                        0,
                        Math.min(100, progress)
                );


        goal.setProgress(progress);


        // Status
        if (progress >= 100) {

            goal.setStatus("COMPLETED");

        } else if (progress >= 50) {

            goal.setStatus("ON_TRACK");

        } else {

            goal.setStatus("AT_RISK");
        }
    }


    // =========================================================
    // GET TOTAL EMISSION
    // =========================================================

    private double getTotalEmission(Long userId) {

        List<Activity> activities =
                activityRepository.findByUserId(userId);

        return activities.stream()
                .mapToDouble(activity ->
                        activity.getEmission() == null
                                ? 0
                                : activity.getEmission()
                )
                .sum();
    }


    // =========================================================
    // MAP ENTITY → RESPONSE
    // =========================================================

    private GoalResponse mapToResponse(Goal goal) {

        return GoalResponse.builder()
                .id(goal.getId())
                .targetPercentage(
                        goal.getTargetPercentage()
                )
                .initialEmission(
                        goal.getInitialEmission()
                )
                .currentEmission(
                        goal.getCurrentEmission()
                )
                .progress(
                        goal.getProgress()
                )
                .status(
                        goal.getStatus()
                )
                .startDate(
                        goal.getStartDate()
                )
                .endDate(
                        goal.getEndDate()
                )
                .build();
    }
}