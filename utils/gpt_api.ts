import * as dotenv from 'dotenv';
dotenv.config();

export const sendMessageToChatApi = async (messages: Array<{ role: string; content: string }>) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat_gpt_api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Replace with your API key
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // or await response.json() if you expect JSON
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorDetails,
      });
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error in sendMessageToChatApi:', error);
    return null;
  }
};

