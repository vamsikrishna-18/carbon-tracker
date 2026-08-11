package com.project.carbontracker.service;

import com.project.carbontracker.entity.Announcement;

import java.util.List;

public interface AnnouncementService {

    List<Announcement> getAllAnnouncements();

    Announcement createAnnouncement(
            Announcement announcement
    );

    Announcement updateAnnouncement(
            Long id,
            Announcement announcement
    );

    void deleteAnnouncement(Long id);
}