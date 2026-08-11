package com.project.carbontracker.repository;

import com.project.carbontracker.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUserId(Long userId);

    List<Activity> findByUserIdAndCreatedAtBetween(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    );

    @Query("""
        SELECT a.category, SUM(a.emission)
        FROM Activity a
        WHERE a.userId = :userId
          AND a.createdAt >= :startDate
        GROUP BY a.category
        ORDER BY SUM(a.emission) DESC
    """)
    List<Object[]> getTopEmissionCategories(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate
    );

    @Query("""
        SELECT a
        FROM Activity a
        WHERE a.userId = :userId
          AND a.createdAt >= :startDate
        ORDER BY a.emission DESC
    """)
    List<Activity> getRecentActivities(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate
    );
}