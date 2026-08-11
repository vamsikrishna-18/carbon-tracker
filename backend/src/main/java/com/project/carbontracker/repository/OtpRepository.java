package com.project.carbontracker.repository;

import com.project.carbontracker.entity.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface OtpRepository extends JpaRepository<Otp, Long> {

    Otp findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}