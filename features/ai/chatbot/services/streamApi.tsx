import Constants from "expo-constants";
import EventSource from 'react-native-sse';

const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_OPENROUTER_API_KEY;

if (!apiKey) {
  console.warn("OpenRouter API key is missing!");
}

interface StreamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: {
      content?: string;
    };
    finish_reason: string | null;
  }>;
}

export async function streamChat(
  prompt: string,
  onMessage: (chunk: string) => void
): Promise<() => void> {
  return new Promise((resolve, reject) => {
    try {
      const url = "https://openrouter.ai/api/v1/chat/completions";
      const body = JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
        stream: true,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const eventSource = new EventSource(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://atpia-app.com',
          'X-Title': 'ATPia-Chatbot',
        },
        body: body,
      });

      eventSource.addEventListener('message', (event) => {
        try {
          if (event.data === '[DONE]') {
            eventSource.close();
            resolve(() => {
              eventSource.close();
            });
            return;
          }

          const parsed: StreamResponse = JSON.parse(event.data || '');
          const content = parsed.choices[0]?.delta?.content;

          if (content) {
            onMessage(content);
          }
        } catch (e) {
          console.error("Failed to parse stream data:", e);
        }
      });

      eventSource.addEventListener('error', (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
        reject(error);
      });

      eventSource.addEventListener('open', () => {
        console.log("EventSource connection opened");
      });

      // Return cleanup function
      resolve(() => {
        eventSource.close();
      });

    } catch (error) {
      reject(error);
    }
  });
}