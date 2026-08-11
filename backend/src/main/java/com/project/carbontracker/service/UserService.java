package com.project.carbontracker.service;

import com.project.carbontracker.dto.ForgotPasswordRequest;
import com.project.carbontracker.dto.LoginRequest;
import com.project.carbontracker.dto.RegisterRequest;
import com.project.carbontracker.dto.ResetPasswordRequest;
import com.project.carbontracker.dto.UpdateProfileRequest;
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
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
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

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    // ============================================================
    // RESULT RECORDS
    // ============================================================

    public record Result(
            HttpStatus status,
            String message
    ) {
    }


    public record LoginResult(
            HttpStatus status,
            String message,
            UserResponse user
    ) {
    }


    public record UserResponse(
            Long id,
            String fullName,
            String email,
            String role,
            Integer age,
            String gender,
            String phoneNumber,
            boolean temporaryPassword
    ) {
    }


    // ============================================================
    // USER REGISTER
    // ============================================================

    // ============================================================
// PUBLIC REGISTER
//
// Supports:
// USER
// ORGANIZATION
//
// ADMIN IS NOT ALLOWED FROM PUBLIC REGISTRATION
// ============================================================

    public Result registerUser(RegisterRequest request) {

        if (request == null) {
            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Registration details are required"
            );
        }

        String email = normalizeEmail(request.getEmail());

        if (email == null || email.isBlank()) {
            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (request.getFullName() == null ||
                request.getFullName().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Full name is required"
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }

        if (request.getPassword().length() < 8) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters"
            );
        }

        // --------------------------------------------------------
        // CHECK EMAIL
        // --------------------------------------------------------

        if (userRepository.existsByEmail(email)) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Email already exists!"
            );
        }

        // --------------------------------------------------------
        // CHECK PHONE
        // --------------------------------------------------------

        if (request.getPhoneNumber() != null &&
                !request.getPhoneNumber().isBlank() &&
                userRepository.existsByPhoneNumber(
                        request.getPhoneNumber()
                )) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Phone number already exists!"
            );
        }

        // --------------------------------------------------------
        // DETERMINE ROLE
        // --------------------------------------------------------

        Role role = Role.USER;

        if (request.getAccountType() != null &&
                request.getAccountType()
                        .equalsIgnoreCase("ORGANIZATION")) {

            role = Role.ORGANIZATION;
        }

        // --------------------------------------------------------
        // CREATE USER
        // --------------------------------------------------------

        User user =
                User.builder()
                        .fullName(
                                request.getFullName().trim()
                        )
                        .email(email)
                        .phoneNumber(
                                request.getPhoneNumber()
                        )
                        .age(
                                request.getAge()
                        )
                        .gender(
                                request.getGender()
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .googleId(null)
                        .authProvider("LOCAL")
                        .role(role)
                        .temporaryPassword(false)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();

        userRepository.save(user);

        System.out.println(
                "========================================"
        );

        System.out.println(
                "REGISTERED ACCOUNT"
        );

        System.out.println(
                "EMAIL: " + email
        );

        System.out.println(
                "ROLE: " + role
        );

        System.out.println(
                "========================================"
        );

        String message;

        if (role == Role.ORGANIZATION) {

            message =
                    "Organization Registered Successfully";

        } else {

            message =
                    "User Registered Successfully";
        }

        return new Result(
                HttpStatus.CREATED,
                message
        );
    }

// ============================================================
// ORGANIZATION REGISTER
// ============================================================

    public Result registerOrganization(
            RegisterRequest request
    ) {

        if (request == null) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Registration details are required"
            );
        }

        String email =
                normalizeEmail(
                        request.getEmail()
                );

        if (email == null ||
                email.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (request.getFullName() == null ||
                request.getFullName().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Organization name is required"
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }

        if (request.getPassword().length() < 8) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters"
            );
        }

        if (userRepository.existsByEmail(email)) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Email already exists!"
            );
        }

        if (request.getPhoneNumber() != null &&
                !request.getPhoneNumber().isBlank() &&
                userRepository.existsByPhoneNumber(
                        request.getPhoneNumber()
                )) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Phone number already exists!"
            );
        }

        User organization =
                User.builder()
                        .fullName(
                                request.getFullName().trim()
                        )
                        .email(email)
                        .phoneNumber(
                                request.getPhoneNumber()
                        )
                        .age(
                                request.getAge()
                        )
                        .gender(
                                request.getGender()
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .googleId(null)
                        .authProvider("LOCAL")
                        .role(Role.ORGANIZATION)
                        .temporaryPassword(false)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();

        userRepository.save(organization);

        System.out.println(
                "ORGANIZATION REGISTERED: " + email
        );

        return new Result(
                HttpStatus.CREATED,
                "Organization Registered Successfully"
        );
    }
    // ============================================================
    // UPDATE USER PROFILE
    // ============================================================

    public UserResponse updateProfile(
            Long id,
            UpdateProfileRequest request
    ) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );


        if (request.getFullName() != null &&
                !request.getFullName().isBlank()) {

            user.setFullName(
                    request.getFullName().trim()
            );
        }


        if (request.getEmail() != null &&
                !request.getEmail().isBlank()) {

            String newEmail =
                    normalizeEmail(
                            request.getEmail()
                    );


            if (!newEmail.equals(
                    user.getEmail()
            ) &&
                    userRepository.existsByEmail(
                            newEmail
                    )) {

                throw new RuntimeException(
                        "Email already exists"
                );
            }


            user.setEmail(newEmail);
        }


        if (request.getPhoneNumber() != null) {

            String phone =
                    request.getPhoneNumber()
                            .trim();


            if (!phone.isBlank() &&
                    !phone.equals(
                            user.getPhoneNumber()
                    ) &&
                    userRepository.existsByPhoneNumber(
                            phone
                    )) {

                throw new RuntimeException(
                        "Phone number already exists"
                );
            }


            user.setPhoneNumber(
                    phone.isBlank()
                            ? null
                            : phone
            );
        }


        if (request.getAge() != null) {

            user.setAge(
                    request.getAge()
            );
        }


        if (request.getGender() != null) {

            user.setGender(
                    request.getGender()
            );
        }


        User updatedUser =
                userRepository.save(user);


        return createUserResponse(
                updatedUser
        );
    }


    // ============================================================
    // ADMIN REGISTER
    // ============================================================

    public Result registerAdmin(
            RegisterRequest request
    ) {

        if (request == null) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Registration details are required"
            );
        }


        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }


        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }


        if (userRepository.existsByEmail(email)) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Email already exists!"
            );
        }


        if (request.getPhoneNumber() != null &&
                !request.getPhoneNumber().isBlank() &&
                userRepository.existsByPhoneNumber(
                        request.getPhoneNumber()
                )) {

            return new Result(
                    HttpStatus.CONFLICT,
                    "Phone number already exists!"
            );
        }


        User admin =
                User.builder()
                        .fullName(
                                request.getFullName()
                        )
                        .email(email)
                        .phoneNumber(
                                request.getPhoneNumber()
                        )
                        .age(
                                request.getAge()
                        )
                        .gender(
                                request.getGender()
                        )
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()
                                )
                        )
                        .googleId(null)
                        .authProvider("LOCAL")
                        .role(Role.ADMIN)
                        .temporaryPassword(false)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();


        userRepository.save(admin);


        System.out.println(
                "ADMIN REGISTERED: " + email
        );


        return new Result(
                HttpStatus.CREATED,
                "Admin Registered Successfully"
        );
    }


    // ============================================================
    // COMMON LOGIN
    //
    // Supports:
    //
    // USER
    // ADMIN
    // ORGANIZATION
    //
    // The role is returned to the frontend.
    // ============================================================

    public LoginResult loginUser(
            LoginRequest request
    ) {

        System.out.println(
                "========================================"
        );

        System.out.println(
                "COMMON LOGIN"
        );

        System.out.println(
                "EMAIL RECEIVED: " +
                        request.getEmail()
        );

        System.out.println(
                "========================================"
        );


        if (request == null) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Login details are required",
                    null
            );
        }


        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Email is required",
                    null
            );
        }


        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Password is required",
                    null
            );
        }


        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);


        if (user == null) {

            return new LoginResult(
                    HttpStatus.NOT_FOUND,
                    "Email not found",
                    null
            );
        }


        System.out.println(
                "FOUND USER: " +
                        user.getEmail()
        );

        System.out.println(
                "ROLE: " +
                        user.getRole()
        );


        // --------------------------------------------------------
        // GOOGLE ACCOUNT
        // --------------------------------------------------------

        if (user.getPassword() == null) {

            return new LoginResult(
                    HttpStatus.UNAUTHORIZED,
                    "This account uses Google login. Please continue with Google.",
                    null
            );
        }


        // --------------------------------------------------------
        // PASSWORD CHECK
        // --------------------------------------------------------

        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );


        if (!passwordMatch) {

            return new LoginResult(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password",
                    null
            );
        }


        // --------------------------------------------------------
        // VALIDATE ROLE
        // --------------------------------------------------------

        if (user.getRole() == null) {

            return new LoginResult(
                    HttpStatus.FORBIDDEN,
                    "Account role is not configured.",
                    null
            );
        }


        /*
         * Supported roles:
         *
         * USER
         * ADMIN
         * ORGANIZATION
         */

        if (user.getRole() != Role.USER &&
                user.getRole() != Role.ADMIN &&
                user.getRole() != Role.ORGANIZATION) {

            return new LoginResult(
                    HttpStatus.FORBIDDEN,
                    "Invalid account role.",
                    null
            );
        }


        // --------------------------------------------------------
        // LOGIN HISTORY
        // --------------------------------------------------------

        saveLoginHistory(user);


        // --------------------------------------------------------
        // RESPONSE
        // --------------------------------------------------------

        UserResponse response =
                createUserResponse(
                        user
                );


        String message;


        if (user.getRole() == Role.ADMIN) {

            message =
                    "Admin Login Successful";

        } else if (
                user.getRole() == Role.ORGANIZATION
        ) {

            message =
                    user.isTemporaryPassword()
                            ? "Organization login successful. Please change your temporary password."
                            : "Organization Login Successful";

        } else {

            message =
                    user.isTemporaryPassword()
                            ? "Login successful. Please change your temporary password."
                            : "Login Successful";
        }


        return new LoginResult(
                HttpStatus.OK,
                message,
                response
        );
    }


    // ============================================================
    // ADMIN LOGIN
    //
    // Kept for compatibility with existing AdminController.
    // ============================================================

    public LoginResult loginAdmin(
            LoginRequest request
    ) {

        if (request == null) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Login details are required",
                    null
            );
        }


        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Email is required",
                    null
            );
        }


        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new LoginResult(
                    HttpStatus.BAD_REQUEST,
                    "Password is required",
                    null
            );
        }


        User admin =
                userRepository
                        .findByEmail(email)
                        .orElse(null);


        if (admin == null) {

            return new LoginResult(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password",
                    null
            );
        }


        if (admin.getRole() != Role.ADMIN) {

            return new LoginResult(
                    HttpStatus.FORBIDDEN,
                    "This is not an admin account.",
                    null
            );
        }


        if (admin.getPassword() == null) {

            return new LoginResult(
                    HttpStatus.UNAUTHORIZED,
                    "This account uses Google login.",
                    null
            );
        }


        boolean passwordMatch =
                passwordEncoder.matches(
                        request.getPassword(),
                        admin.getPassword()
                );


        if (!passwordMatch) {

            return new LoginResult(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password",
                    null
            );
        }


        saveLoginHistory(admin);


        UserResponse response =
                createUserResponse(
                        admin
                );


        return new LoginResult(
                HttpStatus.OK,
                "Admin Login Successful",
                response
        );
    }


    // ============================================================
    // GOOGLE USER SUPPORT
    // ============================================================

    public User findOrCreateGoogleUser(
            String googleId,
            String email,
            String fullName
    ) {

        String normalizedEmail =
                normalizeEmail(email);


        Optional<User> googleUser =
                userRepository.findByGoogleId(
                        googleId
                );


        if (googleUser.isPresent()) {

            return googleUser.get();
        }


        Optional<User> existingUser =
                userRepository.findByEmail(
                        normalizedEmail
                );


        if (existingUser.isPresent()) {

            User user =
                    existingUser.get();


            user.setGoogleId(
                    googleId
            );


            if (user.getPassword() == null) {

                user.setAuthProvider(
                        "GOOGLE"
                );
            }


            return userRepository.save(
                    user
            );
        }


        User newUser =
                User.builder()
                        .fullName(fullName)
                        .email(normalizedEmail)
                        .phoneNumber(null)
                        .age(null)
                        .gender(null)
                        .password(null)
                        .googleId(googleId)
                        .authProvider("GOOGLE")
                        .role(Role.USER)
                        .temporaryPassword(false)
                        .createdAt(
                                LocalDateTime.now()
                        )
                        .build();


        return userRepository.save(
                newUser
        );
    }


    // ============================================================
    // GOOGLE LOGIN RESPONSE
    // ============================================================

    public UserResponse createGoogleLoginResponse(
            User user
    ) {

        return createUserResponse(
                user
        );
    }


    // ============================================================
    // SAVE LOGIN HISTORY
    // ============================================================

    public void saveLoginHistory(
            User user
    ) {

        LoginHistory history =
                LoginHistory.builder()
                        .userId(
                                user.getId()
                        )
                        .fullName(
                                user.getFullName()
                        )
                        .email(
                                user.getEmail()
                        )
                        .loginTime(
                                LocalDateTime.now()
                        )
                        .build();


        loginHistoryRepository.save(
                history
        );
    }


    // ============================================================
    // CHANGE PASSWORD
    // ============================================================

    // ============================================================
// CHANGE PASSWORD
// ============================================================

    public Result changePassword(
            Long userId,
            String currentPassword,
            String newPassword
    ) {

        // --------------------------------------------------------
        // VALIDATE CURRENT PASSWORD
        // --------------------------------------------------------

        if (currentPassword == null ||
                currentPassword.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Current password is required"
            );
        }


        // --------------------------------------------------------
        // VALIDATE NEW PASSWORD
        // --------------------------------------------------------

        if (newPassword == null ||
                newPassword.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "New password is required"
            );
        }


        if (newPassword.length() < 8) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "New password must be at least 8 characters"
            );
        }


        // --------------------------------------------------------
        // FIND USER
        // --------------------------------------------------------

        User user =
                userRepository
                        .findById(userId)
                        .orElse(null);


        if (user == null) {

            return new Result(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            );
        }


        // --------------------------------------------------------
        // GOOGLE ACCOUNT
        // --------------------------------------------------------

        if (user.getPassword() == null) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Google accounts cannot change password here. Please use password reset."
            );
        }


        // --------------------------------------------------------
        // CHECK CURRENT PASSWORD
        // --------------------------------------------------------

        boolean currentPasswordMatches =
                passwordEncoder.matches(
                        currentPassword,
                        user.getPassword()
                );


        if (!currentPasswordMatches) {

            return new Result(
                    HttpStatus.UNAUTHORIZED,
                    "Current password is incorrect"
            );
        }


        // --------------------------------------------------------
        // CHECK SAME PASSWORD
        // --------------------------------------------------------

        if (passwordEncoder.matches(
                newPassword,
                user.getPassword()
        )) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "New password must be different from current password"
            );
        }


        // --------------------------------------------------------
        // UPDATE PASSWORD
        // --------------------------------------------------------

        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );


        // --------------------------------------------------------
        // TEMPORARY PASSWORD COMPLETED
        // --------------------------------------------------------

        user.setTemporaryPassword(false);


        userRepository.save(user);


        return new Result(
                HttpStatus.OK,
                "Password changed successfully"
        );
    }
    // ============================================================
// GET USER PROFILE
// ============================================================

    public UserResponse getProfile(Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        return createUserResponse(user);
    }
    // ============================================================
// GET USER PROFILE
// ============================================================

    public UserResponse getUserProfile(Long id) {

        User user =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        return createUserResponse(user);
    }
    // ============================================================
    // SEND OTP
    // ============================================================

    @Transactional
    public Result sendOtp(
            ForgotPasswordRequest request
    ) {

        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }


        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);


        if (user == null) {

            return new Result(
                    HttpStatus.NOT_FOUND,
                    "Email not found"
            );
        }


        if (user.getPassword() == null) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "This account uses Google login. Please continue with Google."
            );
        }


        otpRepository.deleteByEmail(
                email
        );


        String otp =
                String.format(
                        "%06d",
                        new Random()
                                .nextInt(1000000)
                );


        LocalDateTime now =
                LocalDateTime.now();


        Otp otpEntity =
                Otp.builder()
                        .email(email)
                        .otp(otp)
                        .createdAt(now)
                        .expiryTime(
                                now.plusMinutes(5)
                        )
                        .build();


        otpRepository.save(
                otpEntity
        );


        emailService.sendOtp(
                email,
                otp
        );


        return new Result(
                HttpStatus.OK,
                "OTP Sent Successfully"
        );
    }


    // ============================================================
    // VERIFY OTP
    // ============================================================

    public Result verifyOtp(
            ResetPasswordRequest request
    ) {

        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }


        Otp otpEntity =
                otpRepository.findByEmail(
                        email
                );


        if (otpEntity == null) {

            return new Result(
                    HttpStatus.NOT_FOUND,
                    "OTP not found"
            );
        }


        if (otpEntity.getExpiryTime()
                .isBefore(
                        LocalDateTime.now()
                )) {

            otpRepository.delete(
                    otpEntity
            );


            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "OTP Expired"
            );
        }


        if (!otpEntity.getOtp()
                .equals(
                        request.getOtp()
                )) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Invalid OTP"
            );
        }


        return new Result(
                HttpStatus.OK,
                "OTP Verified"
        );
    }


    // ============================================================
    // RESET PASSWORD
    // ============================================================

    public Result resetPassword(
            ResetPasswordRequest request
    ) {

        String email =
                normalizeEmail(
                        request.getEmail()
                );


        if (email == null ||
                email.isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }


        if (request.getNewPassword() == null ||
                request.getNewPassword().isBlank()) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "New password is required"
            );
        }


        if (request.getNewPassword().length() < 6) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Password must be at least 6 characters"
            );
        }


        Otp otpEntity =
                otpRepository.findByEmail(
                        email
                );


        if (otpEntity == null) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "OTP not found"
            );
        }


        if (otpEntity.getExpiryTime()
                .isBefore(
                        LocalDateTime.now()
                )) {

            otpRepository.delete(
                    otpEntity
            );


            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "OTP Expired"
            );
        }


        if (!otpEntity.getOtp()
                .equals(
                        request.getOtp()
                )) {

            return new Result(
                    HttpStatus.BAD_REQUEST,
                    "Invalid OTP"
            );
        }


        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);


        if (user == null) {

            return new Result(
                    HttpStatus.NOT_FOUND,
                    "User not found"
            );
        }


        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );


        if ("GOOGLE".equals(
                user.getAuthProvider()
        )) {

            user.setAuthProvider(
                    "LOCAL"
            );
        }


        user.setTemporaryPassword(
                false
        );


        userRepository.save(
                user
        );


        otpRepository.delete(
                otpEntity
        );


        return new Result(
                HttpStatus.OK,
                "Password Reset Successful"
        );
    }


    // ============================================================
    // NORMALIZE EMAIL
    // ============================================================

    private String normalizeEmail(
            String email
    ) {

        if (email == null) {

            return null;
        }


        return email
                .trim()
                .toLowerCase();
    }


    // ============================================================
    // CREATE USER RESPONSE
    // ============================================================

    private UserResponse createUserResponse(
            User user
    ) {

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole() != null
                        ? user.getRole().name()
                        : null,
                user.getAge(),
                user.getGender(),
                user.getPhoneNumber(),
                user.isTemporaryPassword()
        );
    }
}