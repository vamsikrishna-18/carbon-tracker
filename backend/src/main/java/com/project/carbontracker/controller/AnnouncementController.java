package com.project.carbontracker.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.entity.Announcement;
import com.project.carbontracker.service.AnnouncementService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/announcements")
@RequiredArgsConstructor
public class AnnouncementController {

    private final AnnouncementService announcementService;

    // GET ALL
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {

        return ResponseEntity.ok(
                announcementService.getAllAnnouncements()
        );
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(
            @RequestBody Announcement announcement
    ) {

        return ResponseEntity.ok(
                announcementService.createAnnouncement(
                        announcement
                )
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(
            @PathVariable Long id,
            @RequestBody Announcement announcement
    ) {

        return ResponseEntity.ok(
                announcementService.updateAnnouncement(
                        id,
                        announcement
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(
            @PathVariable Long id
    ) {

        announcementService.deleteAnnouncement(id);

        return ResponseEntity.noContent().build();
    }
}