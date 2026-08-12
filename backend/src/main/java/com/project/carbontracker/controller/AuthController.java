package com.project.carbontracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.service.UserService;
import com.project.carbontracker.service.UserService.LoginResult;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResult> login(
            @RequestBody LoginRequest request
    ) {

        System.out.println("========== COMMON LOGIN ==========");
        System.out.println("EMAIL: " + request.getEmail());

        LoginResult result =
                userService.loginUser(request);

        System.out.println(
                "LOGIN STATUS: " + result.status()
        );

        System.out.println(
                "LOGIN MESSAGE: " + result.message()
        );

        return ResponseEntity
                .status(result.status())
                .body(result);
    }
}