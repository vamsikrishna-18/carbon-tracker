package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.GoalRequest;
import com.project.carbontracker.dto.GoalResponse;
import com.project.carbontracker.service.GoalService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {


    private final GoalService goalService;



    @PostMapping("/create")
    public GoalResponse createGoal(
            @RequestBody GoalRequest request){

        return goalService.createGoal(request);
    }



    @GetMapping("/user/{userId}")
    public List<GoalResponse> getUserGoals(
            @PathVariable Long userId){

        return goalService.getUserGoals(userId);
    }



    @GetMapping("/progress/{goalId}")
    public GoalResponse getProgress(
            @PathVariable Long goalId){

        return goalService.getGoalProgress(goalId);
    }



    @PutMapping("/update/{goalId}")
    public GoalResponse updateGoal(
            @PathVariable Long goalId,
            @RequestBody GoalRequest request){

        return goalService.updateGoal(goalId, request);
    }

}