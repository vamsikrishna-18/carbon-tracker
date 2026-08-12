package com.project.carbontracker.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.EmployeeCreateRequest;
import com.project.carbontracker.service.OrganizationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/organization")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;


    // ============================================================
    // ORGANIZATION DASHBOARD
    // ============================================================

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getOrganizationDashboard() {

        return ResponseEntity.ok(
                organizationService.getOrganizationDashboard()
        );
    }


    // ============================================================
    // EMPLOYEES
    // ============================================================

    @GetMapping("/employees")
    public ResponseEntity<?> getEmployees() {

        return ResponseEntity.ok(
                organizationService.getEmployees()
        );
    }


    // ============================================================
    // CREATE EMPLOYEE
    // ============================================================

    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(
            @RequestBody EmployeeCreateRequest request
    ) {

        try {

            return ResponseEntity.ok(
                    organizationService.createEmployee(request)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    e.getMessage()
                            )
                    );
        }
    }


    // ============================================================
    // ACTIVITIES
    // ============================================================

    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {

        return ResponseEntity.ok(
                organizationService.getActivities()
        );
    }


    // ============================================================
    // BADGES
    // ============================================================

    @GetMapping("/badges")
    public ResponseEntity<?> getBadges() {

        return ResponseEntity.ok(
                organizationService.getBadges()
        );
    }


    // ============================================================
    // EMISSION FACTORS
    // ============================================================

    @GetMapping("/emission-factors")
    public ResponseEntity<?> getEmissionFactors() {

        return ResponseEntity.ok(
                organizationService.getEmissionFactors()
        );
    }


    // ============================================================
    // ANALYTICS
    // ============================================================

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {

        return ResponseEntity.ok(
                organizationService.getAnalytics()
        );
    }


    // ============================================================
    // LEADERBOARD
    // ============================================================

    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard() {

        return ResponseEntity.ok(
                organizationService.getLeaderboard()
        );
    }
}