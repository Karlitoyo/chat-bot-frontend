import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is loaded from .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { messages } = req.body;

    try {
      // Setting up the parameters for the OpenAI API call
      const params: OpenAI.Chat.ChatCompletionCreateParams = {
        messages: messages,
        model: 'gpt-4o', // Replace with the appropriate model
        temperature: 0.7,
        max_tokens: 2000,
      };

      // Perform the API request
      const chatCompletion = await client.chat.completions.create(params);

      // Send the response back to the frontend
      res.status(200).json({ content: chatCompletion.choices[0]?.message?.content });
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
