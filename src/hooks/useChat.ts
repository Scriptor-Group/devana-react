import { useEffect, useRef, useState } from "react";

const API_URL = `https://api.devana.ai`;

export const useChat = ({
  iaId,
  userToken,
}: {
  iaId: string;
  userToken?: string;
}) => {
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

  const sendMessage = (
    message: string,
    options: {
      files?: any[];
      chatId?: string;
      advancedCrawling?: boolean;
      searchZone?: any[];
      onMessage: (message: string) => void;
      onFinish: (data: {
        text: string;
        chatId: string;
      }) => void;
      onError: (error: any) => void;
    },
  ) => {
    setGenerating(true);
    eventSource.current = new EventSource(
      `${API_URL}/chat/${iaId}?message=${encodeURIComponent(message)}&files=${
        (options?.files || [])?.length > 0
          ? (options?.files || []).map((e) => e.uploadId).join(",")
          : ""
      }&chatId=${options.chatId}${
        userToken ? `&token=${userToken}` : ""
      }&advancedCrawling=${options.advancedCrawling ? "true" : "false"}${
        (options?.searchZone || [])?.length > 0
          ? `&searchZone=${(options?.searchZone || []).map((e) => e.value).join(",")}`
          : ""
      }`,
    );

    eventSource.current.onmessage = async (event: MessageEvent) => {
      if (event.data?.startsWith("[JSON]")) {
        setGenerating(false);
        const json = JSON.parse(event.data.replace("[JSON]", ""));

        if (json) {
          options.onFinish && (await options.onFinish(json));
        }

        return;
      }

      options.onMessage &&
        (await options.onMessage(event.data?.replace(/\\n/g, "\n")));
    };

    eventSource.current.onerror = (error: any) => {
      console.error("EventSource failed:", error);
      setGenerating(false);
      options.onError && options.onError(error);

      if (eventSource.current) {
        eventSource.current.close();
      }
    };
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
