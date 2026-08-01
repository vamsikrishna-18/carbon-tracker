package com.project.carbontracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("Carbon Tracker Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                        "Your OTP for resetting your Carbon Tracker password is:\n\n" +
                        otp +
                        "\n\nThis OTP is valid for 5 minutes.\n\n" +
                        "If you didn't request this, please ignore this email."
        );

        mailSender.send(message);
    }
}