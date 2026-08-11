package com.project.carbontracker.controller;

import com.project.carbontracker.service.ChatServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173")
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