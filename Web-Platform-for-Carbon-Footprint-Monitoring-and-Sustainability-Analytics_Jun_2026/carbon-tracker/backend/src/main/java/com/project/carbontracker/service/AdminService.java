package com.project.carbontracker.service;

import com.project.carbontracker.entity.Role;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    // Response for simple operations
    public record Result(HttpStatus status, String message) {}

    // Dashboard statistics
    public record DashboardResponse(
            long totalUsers,
            long totalAdmins
    ) {}

    // Dashboard Stats
    public DashboardResponse getDashboardStats() {

        long totalUsers = userRepository.count();
        long totalAdmins = userRepository.countByRole(Role.ADMIN);

        return new DashboardResponse(
                totalUsers,
                totalAdmins
        );
    }

    // Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Promote User to Admin
    public Result makeAdmin(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return new Result(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return new Result(HttpStatus.OK, "User promoted to Admin");
    }

    // Remove Admin
    public Result removeAdmin(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return new Result(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setRole(Role.USER);
        userRepository.save(user);

        return new Result(HttpStatus.OK, "Admin removed successfully");
    }

    // Delete User
    public Result deleteUser(Long id) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return new Result(HttpStatus.NOT_FOUND, "User not found");
        }

        userRepository.delete(user);

        return new Result(HttpStatus.OK, "User deleted successfully");
    }
}