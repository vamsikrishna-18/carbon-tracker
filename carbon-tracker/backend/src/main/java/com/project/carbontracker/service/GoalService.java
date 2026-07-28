package com.project.carbontracker.service;

import com.project.carbontracker.dto.GoalRequest;
import com.project.carbontracker.dto.GoalResponse;
import com.project.carbontracker.entity.Goal;
import com.project.carbontracker.entity.User;
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


    // Create Goal
    public GoalResponse createGoal(GoalRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        Goal goal = Goal.builder()
                .user(user)
                .targetPercentage(request.getTargetPercentage())
                .initialEmission(0)
                .currentEmission(0)
                .progress(0)
                .status("ON_TRACK")
                .startDate(LocalDate.now())
                .endDate(request.getEndDate())
                .build();


        Goal savedGoal = goalRepository.save(goal);


        return mapToResponse(savedGoal);
    }


    // Get user goals
    public List<GoalResponse> getUserGoals(Long userId){

        return goalRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }



    // Get goal progress
    public GoalResponse getGoalProgress(Long goalId){

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));


        return mapToResponse(goal);
    }



    // Update goal
    public GoalResponse updateGoal(Long goalId, GoalRequest request){

        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));


        goal.setTargetPercentage(request.getTargetPercentage());
        goal.setEndDate(request.getEndDate());


        return mapToResponse(goalRepository.save(goal));
    }



    private GoalResponse mapToResponse(Goal goal){

        return GoalResponse.builder()
                .id(goal.getId())
                .targetPercentage(goal.getTargetPercentage())
                .initialEmission(goal.getInitialEmission())
                .currentEmission(goal.getCurrentEmission())
                .progress(goal.getProgress())
                .status(goal.getStatus())
                .startDate(goal.getStartDate())
                .endDate(goal.getEndDate())
                .build();

    }

}