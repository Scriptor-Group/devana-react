import { useEffect, useRef, useState } from "react";
import { API_URL, API_VERSION } from "../config";
import { IMessage, TFiabilityMessage, TLangKey } from "../types";

/**
 * Custom hook for handling chat functionality.
 * @param {Object} options - The options object.
 * @param {string | null} options.userToken - The user token.
 * @returns {Object} - An object containing the sendMessage function, generating state, and handleStop function.
 */
export const useChat = ({ userToken }: { userToken?: string | null }) => {
  const [generating, setGenerating] = useState(false);
  const [tools, setTools] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<string | null>(null);
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
    lang: TLangKey,
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
    setTools([]);

    const url = `${API_URL}${API_VERSION}/chat/conversation/public/message`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lang,
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

          if (token) {
            if (token.startsWith("[tool:start")) {
              const toolName = token.match(/\[tool:start:(.*)\]/)?.[1];
              if (toolName) {
                setActiveTool(toolName);
                setTools((t) => [...t, toolName]);
              }
            } else if (token.startsWith("[tool:end")) {
              // Handle tool end if needed
            } else {
              if (token.includes("DONE")) {
                options.onFinish && options.onFinish({ text: fullMessage });
                break;
              }

              fullMessage += token;

              options.onMessage && options.onMessage(fullMessage);
            }
          }
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
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

  const handleFiabilityMessageIA = async (
    message: IMessage,
    fiability: TFiabilityMessage,
    options?: {
      onError?: (error: string) => void;
    },
  ) => {
    if (!message.message_id) return;
    const url = `${API_URL}${API_VERSION}/chat/conversation/public/message/fiability`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message_id: message.message_id,
          client_token: userToken,
          fiability: fiability,
        }),
      });

      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        const errorResponse = await response.json();
        console.error(`Error details: ${errorResponse.error}`);
        return;
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      options?.onError &&
        options?.onError(
          error instanceof Error ? error.message : "An error occurred",
        );
      console.error(error);
    }
  };

  return {
    sendMessage,
    generating,
    handleStop,
    handleFiabilityMessageIA,
    tools,
    activeTool,
  };
};
