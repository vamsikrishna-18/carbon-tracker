package com.project.carbontracker.repository;

import com.project.carbontracker.entity.UserBadge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {

    List<UserBadge> findByUserId(Long userId);

    boolean existsByUserIdAndBadge_Id(Long userId, Long badgeId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserBadge ub WHERE ub.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}