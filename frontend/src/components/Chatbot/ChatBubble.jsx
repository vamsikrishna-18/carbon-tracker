import { MessageCircle } from "lucide-react";

function ChatBubble({ onClick }) {
  return (
    <button className="chat-bubble" onClick={onClick}>
      <MessageCircle size={28} />
    </button>
  );
}

export default ChatBubble;