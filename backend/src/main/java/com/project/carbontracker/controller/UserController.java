package com.project.carbontracker.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.dto.ChangePasswordRequest;
import com.project.carbontracker.dto.ForgotPasswordRequest;
import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.dto.ResetPasswordRequest;
import com.project.carbontracker.dto.UpdateProfileRequest;
import com.project.carbontracker.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;


    // ============================================================
    // REGISTER
    // ============================================================

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestBody RegisterRequest request
    ) {

        UserService.Result result =
                userService.registerUser(request);

        return ResponseEntity
                .status(result.status())
                .body(
                        Map.of(
                                "message",
                                result.message()
                        )
                );
    }


    // ============================================================
    // ORGANIZATION REGISTER
    // ============================================================

    @PostMapping("/register-organization")
    public ResponseEntity<?> registerOrganization(
            @RequestBody RegisterRequest request
    ) {

        UserService.Result result =
                userService.registerOrganization(request);

        return ResponseEntity
                .status(result.status())
                .body(
                        Map.of(
                                "message",
                                result.message()
                        )
                );
    }


    // ============================================================
    // LOGIN
    // ============================================================

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest request
    ) {

        UserService.LoginResult result =
                userService.loginUser(request);

        if (result.user() == null) {

            return ResponseEntity
                    .status(result.status())
                    .body(
                            Map.of(
                                    "message",
                                    result.message()
                            )
                    );
        }

        return ResponseEntity
                .status(result.status())
                .body(
                        Map.of(
                                "message",
                                result.message(),
                                "user",
                                result.user()
                        )
                );
    }


    // ============================================================
    // CHANGE PASSWORD
    //
    // POST:
    // /api/user/change-password/{id}
    // ============================================================

    @PostMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request
    ) {

        if (request == null) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "message",
                                    "Password details are required"
                            )
                    );
        }

        UserService.Result result =
                userService.changePassword(
                        id,
                        request.getCurrentPassword(),
                        request.getNewPassword()
                );

        return ResponseEntity
                .status(result.status())
                .body(
                        Map.of(
                                "message",
                                result.message()
                        )
                );
    }


    // ============================================================
    // FORGOT PASSWORD
    // ============================================================

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) {

        UserService.Result result =
                userService.sendOtp(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }


    // ============================================================
    // VERIFY OTP
    // ============================================================

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(
            @RequestBody ResetPasswordRequest request
    ) {

        UserService.Result result =
                userService.verifyOtp(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }


    // ============================================================
    // RESET PASSWORD
    // ============================================================

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {

        UserService.Result result =
                userService.resetPassword(request);

        return ResponseEntity
                .status(result.status())
                .body(result.message());
    }

    // ============================================================
// GET USER PROFILE
// ============================================================

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(
            @PathVariable Long id
    ) {

        UserService.UserResponse user =
                userService.getUserProfile(id);

        return ResponseEntity.ok(user);
    }
    // ============================================================
    // UPDATE PROFILE
    // ============================================================

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request
    ) {

        return ResponseEntity.ok(
                userService.updateProfile(
                        id,
                        request
                )
        );
    }
}