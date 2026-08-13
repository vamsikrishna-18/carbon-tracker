package com.project.carbontracker.config;

import com.project.carbontracker.entity.User;
import com.project.carbontracker.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

/**
 * Completes Google sign-in and sends the same user payload that the normal
 * login endpoint returns to the React application. This avoids depending on a
 * cross-site session cookie after Render redirects back to Vercel.
 */
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        if (!(authentication.getPrincipal() instanceof OAuth2User oauthUser)) {
            response.sendRedirect(frontendUrl + "/login?error=google-authentication-failed");
            return;
        }

        String googleId = oauthUser.getName();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        if (email == null || email.isBlank()) {
            response.sendRedirect(frontendUrl + "/login?error=google-email-required");
            return;
        }

        String displayName = name == null || name.isBlank()
                ? email.substring(0, email.indexOf('@'))
                : name;
        User user = userService.findOrCreateGoogleUser(googleId, email, displayName);
        userService.saveLoginHistory(user);

        String redirectUrl = UriComponentsBuilder
                .fromUriString(frontendUrl.replaceAll("/+$", ""))
                .path("/google-success")
                .queryParam("id", user.getId())
                .queryParam("name", user.getFullName())
                .queryParam("email", user.getEmail())
                .queryParam("role", user.getRole().name())
                .build()
                .encode()
                .toUriString();

        response.sendRedirect(redirectUrl);
    }
}
