package com.project.carbontracker.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.carbontracker.service.ChatServiceImpl;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatServiceImpl chatService;

    public ChatController(ChatServiceImpl chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Map<String, String> chat(
            @RequestBody Map<String, String> request
    ) {

        String message = request.get("message");

        if (message == null || message.trim().isEmpty()) {
            return Map.of(
                    "reply",
                    "Please enter a message."
            );
        }

        String reply = chatService.getReply(message);

        return Map.of(
                "reply",
                reply
        );
    }
}