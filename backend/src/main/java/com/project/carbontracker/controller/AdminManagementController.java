package com.project.carbontracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.carbontracker.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminManagementController {

    @Autowired
    private AdminService adminService;

    // Dashboard Statistics
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    // Get All Users
    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // Make User Admin
    @PutMapping("/make-admin/{id}")
    public ResponseEntity<?> makeAdmin(@PathVariable Long id) {

        AdminService.Result result = adminService.makeAdmin(id);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

    // Remove Admin
    @PutMapping("/remove-admin/{id}")
    public ResponseEntity<?> removeAdmin(@PathVariable Long id) {

        AdminService.Result result = adminService.removeAdmin(id);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

    // Delete User
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {

        AdminService.Result result = adminService.deleteUser(id);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

}