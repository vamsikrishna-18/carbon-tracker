package com.project.carbontracker.controller;

import com.project.carbontracker.entity.Announcement;
import com.project.carbontracker.service.AnnouncementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/announcements")
@CrossOrigin(origins = "http://localhost:5173")
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