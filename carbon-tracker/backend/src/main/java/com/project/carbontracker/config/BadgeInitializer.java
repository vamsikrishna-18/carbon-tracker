package com.project.carbontracker.config;

import com.project.carbontracker.entity.Badge;
import com.project.carbontracker.repository.BadgeRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BadgeInitializer {

    private final BadgeRepository badgeRepository;

    @PostConstruct
    public void init() {

        System.out.println("========== BadgeInitializer Started ==========");

        System.out.println("Current Badge Count: " + badgeRepository.count());

        if (badgeRepository.count() > 0) {
            System.out.println("Badges already exist.");
            return;
        }

        System.out.println("Inserting default badges...");

        badgeRepository.save(
                Badge.builder()
                        .name("Eco Starter")
                        .description("Added your first activity.")
                        .icon("🌱")
                        .pointsRequired(0)
                        .build()
        );

        badgeRepository.save(
                Badge.builder()
                        .name("Green Explorer")
                        .description("Earn 100 Eco Points.")
                        .icon("🍃")
                        .pointsRequired(100)
                        .build()
        );

        badgeRepository.save(
                Badge.builder()
                        .name("Energy Saver")
                        .description("Earn 500 Eco Points.")
                        .icon("⚡")
                        .pointsRequired(500)
                        .build()
        );

        badgeRepository.save(
                Badge.builder()
                        .name("Carbon Champion")
                        .description("Earn 1000 Eco Points.")
                        .icon("🏆")
                        .pointsRequired(1000)
                        .build()
        );

        System.out.println("Badges Inserted Successfully!");
    }
    }
