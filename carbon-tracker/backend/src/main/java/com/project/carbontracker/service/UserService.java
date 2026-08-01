package com.project.carbontracker.service;

import com.project.carbontracker.dto.ForgotPasswordRequest;
import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.dto.ResetPasswordRequest;
import com.project.carbontracker.entity.LoginHistory;
import com.project.carbontracker.entity.Otp;
import com.project.carbontracker.entity.Role;
import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.LoginHistoryRepository;
import com.project.carbontracker.repository.OtpRepository;
import com.project.carbontracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.project.carbontracker.dto.UpdateProfileRequest;
import java.time.LocalDateTime;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private LoginHistoryRepository loginHistoryRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public record Result(HttpStatus status, String message) {}

    public record LoginResult(HttpStatus status, String message, UserResponse user) {}

    public record UserResponse(Long id, String fullName, String email, String role, Integer age, String gender,
                               String name) {}

    // ================= USER REGISTER =================

    public Result registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new Result(HttpStatus.CONFLICT, "Email already exists!");
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            return new Result(HttpStatus.CONFLICT, "Phone number already exists!");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .age(request.getAge())
                .gender(request.getGender())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return new Result(HttpStatus.CREATED, "User Registered Successfully");
    }
    public UserResponse updateProfile(Long id, UpdateProfileRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAge(request.getAge());
        user.setGender(request.getGender());

        User updatedUser = userRepository.save(user);

        return new UserResponse(
                updatedUser.getId(),
                updatedUser.getFullName(),
                updatedUser.getEmail(),
                updatedUser.getPhoneNumber(),
                updatedUser.getAge(),
                updatedUser.getGender(),
                updatedUser.getRole().name()
        );
    }

    // ================= ADMIN REGISTER =================

    public Result registerAdmin(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return new Result(HttpStatus.CONFLICT, "Email already exists!");
        }

        if (userRepository.existsByPhoneNumber(request.getPhoneNumber())) {
            return new Result(HttpStatus.CONFLICT, "Phone number already exists!");
        }

        User admin = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .age(request.getAge())
                .gender(request.getGender())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(admin);

        return new Result(HttpStatus.CREATED, "Admin Registered Successfully");
    }

    // ================= USER LOGIN =================

    public LoginResult loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new LoginResult(HttpStatus.NOT_FOUND, "User not found!", null);
        }
        System.out.println("Role = " + user.getRole());
        if (user.getRole() != Role.USER) {
            return new LoginResult(
                    HttpStatus.FORBIDDEN,
                    "Please use Admin Login",
                    null
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResult(HttpStatus.UNAUTHORIZED, "Invalid Password!", null);
        }

        LoginHistory history = LoginHistory.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .loginTime(LocalDateTime.now())
                .build();

        loginHistoryRepository.save(history);

        UserResponse response = new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAge(),
                user.getGender(),
                user.getRole().name()
        );

        return new LoginResult(HttpStatus.OK, "User Login Successful", response);
    }

    // ================= ADMIN LOGIN =================

    public LoginResult loginAdmin(LoginRequest request) {

        User admin = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (admin == null) {
            return new LoginResult(HttpStatus.NOT_FOUND, "Admin not found!", null);
        }

        // Only ADMIN can login here
        if (admin.getRole() != Role.ADMIN) {
            return new LoginResult(
                    HttpStatus.FORBIDDEN,
                    "Not an Admin Account",
                    null
            );
        }

        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            return new LoginResult(HttpStatus.UNAUTHORIZED, "Invalid Password!", null);
        }

        LoginHistory history = LoginHistory.builder()
                .userId(admin.getId())
                .fullName(admin.getFullName())
                .email(admin.getEmail())
                .loginTime(LocalDateTime.now())
                .build();

        loginHistoryRepository.save(history);

        UserResponse response = new UserResponse(
                admin.getId(),
                admin.getFullName(),
                admin.getEmail(),
                admin.getPhoneNumber(),
                admin.getAge(),
                admin.getGender(),
                admin.getRole().name()
        );

        return new LoginResult(HttpStatus.OK, "Admin Login Successful", response);
    }
    // ================= SEND OTP =================

    public Result sendOtp(ForgotPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new Result(HttpStatus.NOT_FOUND, "Email not found");
        }

        String otp = String.format("%06d", new Random().nextInt(999999));

        otpRepository.deleteByEmail(request.getEmail());

        Otp otpEntity = Otp.builder()
                .email(request.getEmail())
                .otp(otp)
                .build();

        otpRepository.save(otpEntity);

        emailService.sendOtp(request.getEmail(), otp);

        return new Result(HttpStatus.OK, "OTP Sent Successfully");
    }
    public Result verifyOtp(ResetPasswordRequest request) {

        Otp otpEntity = otpRepository.findByEmail(request.getEmail()).orElse(null);

        if (otpEntity == null) {
            return new Result(HttpStatus.NOT_FOUND, "OTP not found");
        }

        if (otpEntity.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpRepository.delete(otpEntity);
            return new Result(HttpStatus.BAD_REQUEST, "OTP Expired");
        }

        if (!otpEntity.getOtp().equals(request.getOtp())) {
            return new Result(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        return new Result(HttpStatus.OK, "OTP Verified");
    }

    // ================= RESET PASSWORD =================

    public Result resetPassword(ResetPasswordRequest request) {

        Otp otpEntity = otpRepository.findByEmail(request.getEmail()).orElse(null);

        if (otpEntity == null) {
            return new Result(HttpStatus.BAD_REQUEST, "OTP not found");
        }

        if (!otpEntity.getOtp().equals(request.getOtp())) {
            return new Result(HttpStatus.BAD_REQUEST, "Invalid OTP");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new Result(HttpStatus.NOT_FOUND, "User not found");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        otpRepository.delete(otpEntity);

        return new Result(HttpStatus.OK, "Password Reset Successful");
    }
}