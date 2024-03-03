import React from "react";
import { useChat } from "../hooks/useChat";

interface IProps {
  metadata?: any;
  children?: React.ReactNode;
  aiId: string;
  chatId?: string;
  agentComponent?: ({
    message
  }: {
    message: string;
  }) => React.ReactNode;
  userComponent?: ({
    message
  }: {
    message: string;
  }) => React.ReactNode;

}

export const Conversation: React.FC<IProps> = ({
  metadata,
  children,
  aiId,
  chatId,
  agentComponent,
  userComponent,
}) => {
  const [currentChatId, setCurrentChatId] = React.useState(chatId);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState<
    {
      message: string;
      type: "user" | "agent";
    }[]
  >([]);

  const { sendMessage } = useChat({
    iaId: aiId,
  });

  const handleSubmitMessage = () => {
    setMessages((m) => [
      ...m,
      {
        message: query,
        type: "user",
      },
    ]);

    sendMessage(query, {
      files: [],
      chatId: currentChatId,
      advancedCrawling: false,
      searchZone: [],
      onMessage: (message: string) => {
        // update last only
        setMessages((m) => {
          if (m.length === 0 || m[m.length - 1].type !== "agent") {
            return [
              ...m,
              {
                message,
                type: "agent",
              },
            ];
          }

          return [
            ...m.slice(0, m.length - 1),
            {
              message: m[m.length - 1].message + message,
              type: "agent",
            },
          ];
        });
      },
      onFinish: (data) => {
        setCurrentChatId(data.chatId);
        setMessages((m) => [
          ...m.slice(0, m.length - 1),
          {
            message: data.text,
            type: "agent",
          },
        ]);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        {messages.map((m, i) => (
          <div
            key={`message_${i}`}
            style={{
              display: "flex",
              justifyContent: m.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            {m.type === "user" && userComponent ? (
              userComponent({ message: m.message })
            ) : m.type === "agent" && agentComponent ? (
              agentComponent({ message: m.message })
            ) : (
              <div
                style={{
                  padding: "8px",
                  backgroundColor: m.type === "user" ? "lightblue" : "lightgreen",
                  borderRadius: "8px",
                  margin: "8px",
                  maxWidth: "70%",
                }}
              >
                <b>{m.type === "user" ? "You" : "Agent"}</b>
                <div>{m.message}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSubmitMessage}>Send</button>
    </div>
  );
};
