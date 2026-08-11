package com.project.carbontracker.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GroqService {

    private final WebClient webClient;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    public GroqService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
    }

    public String generateResponse(String message) {

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", model,
                    "messages", new Object[]{
                            Map.of(
                                    "role", "system",
                                    "content",
                                    "You are CarbonTracker AI, a helpful assistant for a carbon footprint tracking application. " +
                                            "Answer questions about carbon emissions, sustainability, eco-friendly habits, " +
                                            "carbon reduction, transportation, energy, food, recycling and environmental topics. " +
                                            "Keep answers clear, practical and concise."
                            ),
                            Map.of(
                                    "role", "user",
                                    "content", message
                            )
                    },
                    "temperature", 0.7,
                    "max_tokens", 500
            );

            Map<?, ?> response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null) {
                return "Sorry, I couldn't generate a response.";
            }

            Object choicesObject = response.get("choices");

            if (!(choicesObject instanceof java.util.List<?> choices)
                    || choices.isEmpty()) {
                return "Sorry, I couldn't generate a response.";
            }

            Object firstChoice = choices.get(0);

            if (!(firstChoice instanceof Map<?, ?> choice)) {
                return "Sorry, I couldn't generate a response.";
            }

            Object messageObject = choice.get("message");

            if (!(messageObject instanceof Map<?, ?> responseMessage)) {
                return "Sorry, I couldn't generate a response.";
            }

            Object content = responseMessage.get("content");

            return content != null
                    ? content.toString()
                    : "Sorry, I couldn't generate a response.";

        } catch (Exception e) {
            System.err.println("Groq API call failed: " + e.getMessage());
            return "Sorry, I'm having trouble connecting to the AI service right now.";
        }
    }
}

