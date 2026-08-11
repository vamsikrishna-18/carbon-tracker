package com.project.carbontracker.service;

import com.project.carbontracker.entity.Announcement;
import com.project.carbontracker.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl
        implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    @Override
    public List<Announcement> getAllAnnouncements() {

        return announcementRepository
                .findAllByOrderByCreatedAtDesc();
    }

    @Override
    public Announcement createAnnouncement(
            Announcement announcement
    ) {

        return announcementRepository.save(
                announcement
        );
    }

    @Override
    public Announcement updateAnnouncement(
            Long id,
            Announcement updatedAnnouncement
    ) {

        Announcement existing =
                announcementRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Announcement not found"
                                )
                        );

        existing.setTitle(
                updatedAnnouncement.getTitle()
        );

        existing.setMessage(
                updatedAnnouncement.getMessage()
        );

        return announcementRepository.save(
                existing
        );
    }

    @Override
    public void deleteAnnouncement(Long id) {

        Announcement announcement =
                announcementRepository
                        .findById(id)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Announcement not found"
                                )
                        );

        announcementRepository.delete(
                announcement
        );
    }
}