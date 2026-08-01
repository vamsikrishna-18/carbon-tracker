package com.project.carbontracker.controller;

import com.project.carbontracker.dto.*;
import com.project.carbontracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        UserService.Result result = userService.registerUser(request);
        return ResponseEntity.status(result.status()).body(result.message());
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request) {
        UserService.LoginResult result = userService.loginUser(request);

        if (result.user() == null) {
            return ResponseEntity.status(result.status())
                    .body(Map.of("message", result.message()));
        }

        return ResponseEntity.status(result.status())
                .body(Map.of("message", result.message(), "user", result.user()));
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {

        UserService.Result result = userService.sendOtp(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody ResetPasswordRequest request) {

        UserService.Result result = userService.verifyOtp(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {

        UserService.Result result = userService.resetPassword(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request) {

        return ResponseEntity.ok(
                userService.updateProfile(id, request)
        );
    }
}