package com.project.carbontracker.controller;

import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.service.UserService;
import com.project.carbontracker.service.UserService.LoginResult;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
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