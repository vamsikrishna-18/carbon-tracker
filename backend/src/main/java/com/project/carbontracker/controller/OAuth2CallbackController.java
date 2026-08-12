package com.project.carbontracker.controller;

import com.project.carbontracker.dto.UserResponse;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class OAuth2CallbackController {

    private final UserService userService;

    // =========================================================
    // GET AUTHENTICATED USER
    //
    // Spring Security's OAuth2 filter chain (configured via
    // .oauth2Login(...) in SecurityConfig) handles the actual
    // Google callback at /login/oauth2/code/google internally —
    // this app never sees that request directly. Once Spring
    // finishes that exchange it redirects the browser straight
    // to frontendUrl + "/dashboard" (see defaultSuccessUrl).
    //
    // The frontend then calls this endpoint on load to fetch
    // the now-authenticated user, relying on the session cookie
    // Spring Security already set rather than any data smuggled
    // through the redirect URL itself.
    // =========================================================

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(
            Authentication authentication
    ) {
        // authentication.isAuthenticated() is true even for
        // Spring's AnonymousAuthenticationToken, so it alone
        // can't tell a real login from an anonymous visitor.
        // Checking the principal's actual type is what makes
        // this check meaningful.
        if (authentication == null
                || !authentication.isAuthenticated()
                || !(authentication.getPrincipal() instanceof OAuth2User oAuth2User)) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Not authenticated"));
        }

        try {
            String googleId = oAuth2User.getName();
            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getAttribute("name");

            User user = userService.findOrCreateGoogleUser(
                    googleId,
                    email,
                    name
            );

            if (user == null) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "error",
                                "User not found or creation failed"
                        ));
            }

            UserResponse response = UserResponse.from(user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "error",
                            e.getMessage() != null
                                    ? e.getMessage()
                                    : "Unknown error while loading user"
                    ));
        }
    }
}