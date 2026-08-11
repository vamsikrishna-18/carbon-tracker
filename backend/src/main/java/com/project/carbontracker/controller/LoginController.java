package com.project.carbontracker.controller;

import com.project.carbontracker.entity.User;
import com.project.carbontracker.repository.UserRepository;
import com.project.carbontracker.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {


    @Autowired
    private UserRepository userRepository;



    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {


        System.out.println("Email received: " + request.getEmail());
        System.out.println("Password received: " + request.getPassword());


        Optional<User> user =
                userRepository.findByEmail(request.getEmail());


        System.out.println("User found: " + user.isPresent());


        if(user.isPresent()) {

            System.out.println("DB Email: " + user.get().getEmail());
            System.out.println("DB Password: " + user.get().getPassword());
            System.out.println("DB Role: " + user.get().getRole());


            if(user.get().getPassword()
                    .equals(request.getPassword())) {


                return ResponseEntity.ok(
                        Map.of(
                                "role", user.get().getRole(),
                                "userId", user.get().getId()
                        )
                );

            }
        }


        return ResponseEntity
                .status(401)
                .body("Invalid credentials");

    }

}