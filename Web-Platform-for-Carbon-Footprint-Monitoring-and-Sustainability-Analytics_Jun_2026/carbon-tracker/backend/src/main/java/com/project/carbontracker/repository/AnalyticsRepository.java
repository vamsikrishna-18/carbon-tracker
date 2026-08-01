package com.project.carbontracker.repository;

import com.project.carbontracker.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalyticsRepository extends JpaRepository<Activity, Long> {

    // Total emission in a date range
    @Query("""
            SELECT COALESCE(SUM(a.emission),0)
            FROM Activity a
            WHERE a.createdAt BETWEEN :startDate AND :endDate
            """)
    Double getTotalEmission(LocalDateTime startDate,
                            LocalDateTime endDate);
    @Query("""
       SELECT a.createdAt,
              SUM(a.emission)
       FROM Activity a
       WHERE a.createdAt BETWEEN :startDate AND :endDate
       GROUP BY a.createdAt
       ORDER BY a.createdAt
       """)
    List<Object[]> getTrendAnalytics(
            LocalDateTime startDate,
            LocalDateTime endDate
    );
    // Total activities in a date range
    @Query("""
            SELECT COUNT(a)
            FROM Activity a
            WHERE a.createdAt BETWEEN :startDate AND :endDate
            """)
    Long getTotalActivities(LocalDateTime startDate,
                            LocalDateTime endDate);

    // Category-wise emission
    @Query("""
            SELECT a.category,
                   SUM(a.emission)
            FROM Activity a
            WHERE a.createdAt BETWEEN :startDate AND :endDate
            GROUP BY a.category
            """)
    List<Object[]> getCategoryAnalytics(
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}