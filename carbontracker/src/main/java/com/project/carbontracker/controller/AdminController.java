package com.project.carbontracker.controller;

import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerAdmin(@RequestBody RegisterRequest request) {
        return userService.registerAdmin(request);
    }

    @PostMapping("/login")
    public String loginAdmin(@RequestBody LoginRequest request) {
        return userService.loginAdmin(request);
    }

}