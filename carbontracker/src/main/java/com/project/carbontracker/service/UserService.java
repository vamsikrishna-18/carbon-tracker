package com.project.carbontracker.service;

import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.entity.Role;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register User
    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            return "Phone number already exists!";
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(request.getPassword())   // We'll encrypt this later
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    // Register Admin
    public String registerAdmin(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            return "Phone number already exists!";
        }

        User admin = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(request.getPassword())
                .role(Role.ADMIN)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(admin);

        return "Admin Registered Successfully";
    }

    // User Login
    public String loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return "User not found!";
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid Password!";
        }

        return "User Login Successful";
    }

    // Admin Login
    public String loginAdmin(LoginRequest request) {

        User admin = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (admin == null) {
            return "Admin not found!";
        }

        if (admin.getRole() != Role.ADMIN) {
            return "Access Denied!";
        }

        if (!admin.getPassword().equals(request.getPassword())) {
            return "Invalid Password!";
        }

        return "Admin Login Successful";
    }
}