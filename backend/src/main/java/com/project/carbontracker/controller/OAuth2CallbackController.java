package com.project.carbontracker.controller;

import com.project.carbontracker.dto.UserResponse;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class OAuth2CallbackController {

    private final UserService userService;

    @Value("${app.frontend.url:http://localhost:4173}")
    private String frontendUrl;

    // =========================================================
    // GOOGLE OAUTH2 CALLBACK
    // =========================================================

    @GetMapping("/google/callback")
    public RedirectView handleGoogleCallback(
            Authentication authentication
    ) {
        try {
            if (authentication == null
                    || !authentication.isAuthenticated()) {
                return new RedirectView(
                        frontendUrl + "/login?error=auth_failed"
                );
            }

            // Get OAuth2 user details
            OAuth2User oAuth2User =
                    (OAuth2User) authentication.getPrincipal();

            String googleId = oAuth2User.getName();
            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");
            String picture = oAuth2User.getAttribute("picture");

            // Find or create user
            User user = userService.findOrCreateGoogleUser(
                    googleId,
                    email,
                    name
            );

            if (user == null) {
                return new RedirectView(
                        frontendUrl + "/login?error=user_creation_failed"
                );
            }

            // Create response with user data
            UserResponse response =
                    userService.createGoogleLoginResponse(user);

            // Redirect to frontend with user data as URL params
            String encodedUser = URLEncoder.encode(
                    response.toString(),
                    StandardCharsets.UTF_8
            );

            return new RedirectView(
                    frontendUrl + "/auth/google/success?user="
                            + encodedUser
            );

        } catch (Exception e) {
            e.printStackTrace();

            String errorMsg = URLEncoder.encode(
                    e.getMessage(),
                    StandardCharsets.UTF_8
            );

            return new RedirectView(
                    frontendUrl + "/login?error=" + errorMsg
            );
        }
    }

    // =========================================================
    // GET AUTHENTICATED USER
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            Authentication authentication
    ) {
        try {
            if (authentication == null
                    || !authentication.isAuthenticated()) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Not authenticated"));
            }

            OAuth2User oAuth2User =
                    (OAuth2User) authentication.getPrincipal();

            String googleId = oAuth2User.getName();
            String email = oAuth2User.getAttribute("email");

            User user =
                    userService.findOrCreateGoogleUser(
                            googleId,
                            email,
                            oAuth2User.getAttribute("name")
                    );

            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "error",
                                "User not found or creation failed"
                        ));
            }

            UserResponse response =
                    userService.createGoogleLoginResponse(user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
