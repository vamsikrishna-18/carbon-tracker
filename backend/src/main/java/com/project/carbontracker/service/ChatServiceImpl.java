package com.project.carbontracker.service;

import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl {

    private final GroqService groqService;

    public ChatServiceImpl(GroqService groqService) {
        this.groqService = groqService;
    }

    public String getReply(String message) {
        return groqService.generateResponse(message);
    }
}
