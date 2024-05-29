import { useEffect, useRef, useState } from "react";
import { API_URL, API_VERSION } from "../config";

/**
 * Custom hook for handling chat functionality.
 * @param {Object} options - The options object.
 * @param {string | null} options.userToken - The user token.
 * @returns {Object} - An object containing the sendMessage function, generating state, and handleStop function.
 */
export const useChat = ({ userToken }: { userToken?: string | null }) => {
  const [generating, setGenerating] = useState(false);
  const eventSource = useRef<EventSource | null>(null);

  useEffect(() => {
    // if component is unmounted, close event source
    return () => {
      if (eventSource?.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, []);

  /**
   * Sends a message to the chat server.
   * @param {string} message - The message to send.
   * @param {Object} options - The options object.
   * @param {Function} options.onMessage - The callback function to handle incoming messages.
   * @param {Function} options.onFinish - The callback function to handle when the message is finished.
   * @param {Function} options.onError - The callback function to handle errors.
   */
  const sendMessage = async (
    message: string,
    options: {
      onMessage?: (message: string) => void;
      onFinish?: (data: { text: string }) => void;
      onError?: (error: string) => void;
    },
  ) => {
    if (!userToken) {
      options.onError && options.onError("No user token");
      return;
    }

    setGenerating(true);

    const url = `${API_URL}${API_VERSION}/chat/conversation/public/message`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stream: true,
          client_token: userToken,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      if (response.status !== 200) {
        setGenerating(false);
        options.onError && options.onError(response.statusText);
        return;
      }

      if (!response.body) {
        setGenerating(false);
        options.onError && options.onError("No response body");
        return;
      }

      const reader = response.body.getReader(); // Convert ReadableStream to ReadableStreamDefaultReader
      const loop = true;
      let fullMessage = "";
      while (loop) {
        try {
          const { done, value } = await reader.read(); // Read the next chunk
          if (done) break; // Exit the loop if there are no more chunks
          const token = new TextDecoder().decode(value); // Convert the chunk to text
          if (token.includes("DONE")) {
            console.log("data", fullMessage);
            options.onFinish && options.onFinish({ text: fullMessage });
            break;
          }

          fullMessage += token;
          console.log("data", fullMessage);
          options.onMessage && options.onMessage(fullMessage);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            console.log("Aborted");
            break;
          } else if (error instanceof Error) {
            console.error(error);
            options.onError && options.onError(error.message);
            break;
          }
          break;
        }
      }
    } catch (error) {
      console.error(error);
      options.onError &&
        options.onError(
          error instanceof Error ? error.message : "An error occurred",
        );
    }
  };

  /**
   * Stops the chat functionality.
   */
  const handleStop = () => {
    if (eventSource?.current) {
      eventSource.current.close();
      eventSource.current = null;
    }
    setGenerating(false);
  };

  return { sendMessage, generating, handleStop };
};
