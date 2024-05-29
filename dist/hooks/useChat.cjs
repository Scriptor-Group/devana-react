"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const config = require("../config.cjs");
const useChat = ({ userToken }) => {
  const [generating, setGenerating] = React.useState(false);
  const eventSource = React.useRef(null);
  React.useEffect(() => {
    return () => {
      if (eventSource?.current) {
        eventSource.current.close();
        eventSource.current = null;
      }
    };
  }, []);
  const sendMessage = async (message, options) => {
    if (!userToken) {
      options.onError && options.onError("No user token");
      return;
    }
    setGenerating(true);
    const url = `${config.API_URL}${config.API_VERSION}/chat/conversation/public/message`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          stream: true,
          client_token: userToken,
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
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
      const reader = response.body.getReader();
      const loop = true;
      let fullMessage = "";
      while (loop) {
        try {
          const { done, value } = await reader.read();
          if (done)
            break;
          const token = new TextDecoder().decode(value);
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
      options.onError && options.onError(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };
  const handleStop = () => {
    if (eventSource?.current) {
      eventSource.current.close();
      eventSource.current = null;
    }
    setGenerating(false);
  };
  return { sendMessage, generating, handleStop };
};
exports.useChat = useChat;
