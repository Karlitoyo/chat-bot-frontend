// pages/chat.tsx
import { useState, useEffect } from "react";
import * as dotenv from "dotenv";
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { storageHelper } from "../../utils/storageHelper";

dotenv.config();

export default function Chat() {
  const [messages, setMessages] = useState<{
    role: string;
    content: string;
    timestamp?: string;
  }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState("");

  const STORAGE_KEY = "chatMessages";

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = storageHelper.loadFromStorage(STORAGE_KEY);
    if (savedMessages) {
      setMessages(savedMessages);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      storageHelper.saveToStorage(STORAGE_KEY, messages);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    const timestamp = new Date().toLocaleTimeString();
    const newMessages = [...messages, { role: "user", content: input, timestamp }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat_gpt_api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      setRawResponse(data.content); // Store the raw response from the API

      if (data.content) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.content,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6">
      <div className="bg-base-100 w-full max-w-3xl p-8 rounded-3xl shadow-lg flex flex-col space-y-6">
        {/* Messages Display */}
        <div className="space-y-4 overflow-y-auto h-96 p-4 border-b border-base-200">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              content={msg.content}
              timestamp={msg.timestamp}
            />
          ))}
          {isLoading && (
            <div className="p-4 rounded-xl bg-gray-200 text-gray-900 text-lg italic">
              <span className="animate-pulse">Assistant is typing...</span>
            </div>
          )}

          {/* Render formatted response directly in the main component */}
          {/* {!isLoading && <FormattedResponse rawResponse={rawResponse} />} */}
        </div>

        {/* Input Section */}
        <ChatInput
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
