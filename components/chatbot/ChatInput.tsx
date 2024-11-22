// components/chatbot/ChatInput.tsx
import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, handleSendMessage, isLoading }) => {
  return (
    <div className="flex items-center space-x-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 text-lg rounded-xl border-2 border-base-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        placeholder="Ask me anything..."
        rows={4}
      />
      <button
        onClick={handleSendMessage}
        className={`btn btn-primary ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
