import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";

import ChatBubble from "./ChatBubble";
import Message from "./Message";
import { sendMessage } from "../../services/chatbotService";

import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message:
        "👋 Hello! I'm Carbon Assistant.\n\nAsk me anything about sustainability, carbon emissions, eco-friendly habits, rewards, or your goals.",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleSend = async () => {
    const userText = text.trim();
    if (!userText || typing) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: userText,
      },
    ]);

    setText("");
    setTyping(true);

    try {
      const response = await sendMessage(userText);

      console.log("Gemini Response:", response);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message: response?.reply || "⚠️ I didn't get a valid response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          message:
            "⚠️ Unable to connect to Carbon Assistant. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {!open && <ChatBubble onClick={() => setOpen(true)} />}

      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div>
              <div
                style={{
                  fontWeight: "700",
                  fontSize: "18px",
                }}
              >
                🌿 Carbon Assistant
              </div>

              <small
                style={{
                  opacity: 0.9,
                  fontSize: "12px",
                }}
              >
                AI Sustainability Guide
              </small>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <Message
                key={index}
                sender={msg.sender}
                message={msg.message}
              />
            ))}

            {typing && (
              <div className="message bot">
                🤖 Carbon Assistant is typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={text}
              disabled={typing}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button onClick={handleSend} disabled={typing || !text.trim()}>
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;