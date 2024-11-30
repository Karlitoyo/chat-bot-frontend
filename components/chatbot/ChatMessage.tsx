// components/chatbot/ChatMessage.tsx
import React from 'react';
import FormattedResponse from '../../components/chatbot/ChatBotResponse';
import { useState } from "react";

interface ChatMessageProps {
  role: string;
  content: string;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  // Extract parts of the content
  const rawResponse = content; // Assuming you want to pass the full content to FormattedResponse
  const partialContent = content.split(' ').slice(0, 5).join(' '); // Example: first 5 words
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={`p-4 rounded-xl shadow-md ${
        role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center">
        <strong className="text-lg font-semibold">
          {role === "user" ? "You" : "Assistant"}
        </strong>
        <span className="text-sm text-gray-500">{timestamp}</span>
      </div>
      <div className={`mt-2 text-lg ${role === "user" ? "text-white" : "text-gray-900"}`}>
        {/* Display partial content or pass it to another component */}
        {!isLoading && <FormattedResponse rawResponse={rawResponse} role={role} content={content} />}
      </div>
    </div>
  );
};

export default ChatMessage;