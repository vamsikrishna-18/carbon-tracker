package com.project.carbontracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;


    // ============================================================
    // SEND OTP
    // ============================================================

    public void sendOtp(
            String email,
            String otp
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(sender);

        message.setTo(email);

        message.setSubject(
                "Carbon Tracker - Password Reset OTP"
        );

        message.setText(
                "Hello,\n\n" +

                        "Your OTP for resetting your " +
                        "Carbon Tracker password is:\n\n" +

                        otp +

                        "\n\nThis OTP is valid for 5 minutes." +

                        "\n\nDo not share this OTP with anyone." +

                        "\n\nRegards,\n" +
                        "Carbon Tracker Team"
        );

        mailSender.send(message);
    }


    // ============================================================
    // SEND EMPLOYEE LOGIN CREDENTIALS
    // ============================================================

    public void sendEmployeeCredentials(
            String email,
            String fullName,
            String defaultPassword
    ) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setFrom(sender);

        message.setTo(email);

        message.setSubject(
                "Carbon Tracker - Employee Account Created"
        );

        message.setText(
                "Hello " +
                        (fullName == null || fullName.isBlank()
                                ? "Employee"
                                : fullName) +
                        ",\n\n" +

                        "Welcome to Carbon Tracker!\n\n" +

                        "An employee account has been created " +
                        "for you by your organization.\n\n" +

                        "Your login credentials are:\n\n" +

                        "Email: " +
                        email +
                        "\n" +

                        "Default Password: " +
                        defaultPassword +
                        "\n\n" +

                        "Please use these credentials to log in " +
                        "to your Carbon Tracker account.\n\n" +

                        "IMPORTANT:\n" +

                        "For security reasons, please change your " +
                        "password after your first login.\n\n" +

                        "Do not share your password with anyone.\n\n" +

                        "Regards,\n" +
                        "Carbon Tracker Team"
        );

        mailSender.send(message);
    }
}

