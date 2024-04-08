import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import styles from "./Conversation.module.css";
import { useApi } from "../hooks/useApi";
import { IIntls, IMessage } from "../types";
import MuiTextField from "./TextField";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import { hexToTransparentHex } from "../commons";

interface IProps {
  publicKey: string;
  welcomeMessage?: string;
  assistantBackgroundColor?: string;
  assistantTextColor?: string;
  userBackgroundColor?: string;
  userTextColor?: string;
  chatBackgroundColor?: string;
  chatBackgroundSecondaryColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  intls?: IIntls;
  hiddenWatermark?: boolean;
}

export const Conversation: React.FC<IProps> = ({
  publicKey,
  welcomeMessage,
  assistantBackgroundColor,
  assistantTextColor,
  userBackgroundColor,
  userTextColor,
  chatBackgroundColor,
  chatBackgroundSecondaryColor,
  buttonBackgroundColor,
  buttonTextColor,
  intls,
  hiddenWatermark,
}) => {
  const [tryCreateToken, setTryCreateToken] = useState(0);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { token, createToken, getConversationHistory } = useApi(publicKey, {});
  const { sendMessage } = useChat({ userToken: token });
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  const [typingMessage, setTypingMessage] = React.useState<IMessage | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  useEffect(() => {
    if (isAutoScroll && refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [messages, typingMessage, query]);

  useEffect(() => {
    if (!refScroll.current) return;
    const scroll = refScroll.current;
    const handleScroll = () => {
      if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 20) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    };
    scroll.addEventListener("scroll", handleScroll);
    return () => scroll.removeEventListener("scroll", handleScroll);
  }, [refScroll]);

  useEffect(() => {
    if (!token) return;
    getConversationHistory().then((data) => {
      try {
        setMessages(data);
      } catch {
        // Silently fail
      }
    });
  }, [token]);

  useEffect(() => {
    if (token) return;
    setTryCreateToken(0);
    createToken();
  }, [publicKey]);

  useEffect(() => {
    if (token) return;
    if (tryCreateToken > 1) return;

    setTryCreateToken((prev) => prev + 1);
    createToken();
  }, [token, tryCreateToken]);

  const handleSubmitMessage = () => {
    if (!query || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `message_${prev.length + 1}`,
        message: {
          role: "user",
          content: query,
        },
        created: Date.now(),
        conversation_id: "",
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0,
        },
      },
    ]);
    setIsPending(true);
    setQuery("");
    setError(null);
    setIsTyping(true);

    sendMessage(query, {
      onError: (error) => {
        setError(error);
        setIsTyping(false);
        console.error(error);
      },
      onFinish: (data) => {
        setIsTyping(false);
        getConversationHistory().then((data) => {
          try {
            setTypingMessage(null);
            setMessages(data);
          } catch {
            // Silently fail
          }
        });
      },
      onMessage: (message) => {
        setIsPending(false);
        setTypingMessage((value) => ({
          id: `message_${value?.id || messages.length + 1}`,
          message: {
            role: "assistant",
            content: message,
          },
          created: Date.now(),
          conversation_id: "",
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        }));
      },
    });
  };

  return (
    <div
      className={styles["devana-conversation-container"]}
      style={{
        backgroundImage: `linear-gradient(140deg, ${chatBackgroundColor}, ${chatBackgroundSecondaryColor})`,
      }}
    >
      <div ref={refScroll} className={styles.scrollZone}>
        <div style={{ height: "26px" }} />
        <div className={styles.messages}>
          {welcomeMessage && (
            <div
              className={styles[`message-assistant`]}
              style={{
                backgroundColor: assistantBackgroundColor,
                color: assistantTextColor,
              }}
            >
              {welcomeMessage}
            </div>
          )}
          {[...messages, ...(typingMessage ? [typingMessage] : [])]
            .filter((e) => e.message.content)
            .sort((a, b) => a.created - b.created)
            .map((m, i) => (
              <div
                key={`message_${m.id}`}
                className={styles[`message-${m.message.role}`]}
                style={
                  m.message.role === "assistant"
                    ? {
                        backgroundColor: hexToTransparentHex(
                          assistantBackgroundColor || "#ffffff",
                          0.8,
                        ),
                        color: assistantTextColor,
                      }
                    : {
                        backgroundColor: hexToTransparentHex(
                          userBackgroundColor || "#ffffff",
                          0.8,
                        ),
                        color: userTextColor,
                      }
                }
              >
                <MarkdownPreview
                  {...{
                    ...MARKDOWN_PROPS,
                    style: {
                      ...MARKDOWN_PROPS.style,
                      color:
                        m.message.role === "assistant"
                          ? assistantTextColor
                          : userTextColor,
                    },
                  }}
                  source={m.message.content}
                />
              </div>
            ))}
          {error && (
            <div
              className={styles[`message-assistant`]}
              style={{
                backgroundColor: hexToTransparentHex("#ff0000", 0.8),
                color: "#ffffff",
              }}
            >
              {error}
            </div>
          )}
          {isPending && (
            <div
              className={styles[`message-assistant`]}
              style={{
                backgroundColor: assistantBackgroundColor,
                color: assistantTextColor,
              }}
            >
              <div className={styles.typing}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
              </div>
            </div>
          )}
        </div>
        <div style={{ height: "50px" }} />
      </div>
      <div className={styles["devana-input"]}>
        <MuiTextField
          value={query}
          onChange={(value) => setQuery(value)}
          onSubmit={handleSubmitMessage}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          intls={intls}
        />
        {!hiddenWatermark && (
          <div className={styles.poweredBy}>
            Propulsé par{" "}
            <a href="https://devana.ai" target="_blank" rel="noreferrer">
              Devana
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
