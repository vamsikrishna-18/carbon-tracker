package com.project.carbontracker.repository;

import com.project.carbontracker.entity.Role;
import com.project.carbontracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    @Query("""
            SELECT u
            FROM User u
            WHERE LOWER(u.email) = LOWER(:email)
            """)
    Optional<User> findByEmail(
            @Param("email") String email
    );

    Optional<User> findByPhoneNumber(
            String phoneNumber
    );

    Optional<User> findByGoogleId(
            String googleId
    );

    boolean existsByEmail(
            String email
    );

    boolean existsByPhoneNumber(
            String phoneNumber
    );

    long countByRole(
            Role role
    );
}