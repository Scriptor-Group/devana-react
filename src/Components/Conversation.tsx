"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import styles from "../styles/conversation.module.css";
import { useApi } from "../hooks/useApi";
import {
  IIntls,
  IMessage,
  TEventName,
  TFiabilityMessage,
  TLang,
  EnumLangChat,
  TLangKey,
  ITheme,
} from "../types";
import MuiTextField from "./TextField";
import { hexToTransparentHex } from "../commons";
import Lang from "./Lang";
import Message from "./Message";
import TypingMessage from "./TypingMessage";

interface IProps {
  publicKey: string;
  welcomeMessage?: {
    [key in TLangKey]: string;
  };
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
  onEvent?: (eventName: TEventName, payload: any) => void;
  displayActions?: boolean;
  displayTools?: boolean;
  theme?: ITheme;
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
  onEvent,
  displayActions,
  displayTools,
  theme,
}) => {
  const [tryCreateToken, setTryCreateToken] = useState(0);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { token, createToken, getConversationHistory } = useApi(publicKey, {});
  const { sendMessage, handleFiabilityMessageIA, tools, activeTool } = useChat({
    userToken: token,
  });
  const refScroll = React.useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  const [typingMessage, setTypingMessage] = React.useState<IMessage | null>(
    null,
  );
  const [error, setError] = React.useState<string | null>(null);
  const [isPending, setIsPending] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [lang, setLang] = useState<TLang>(EnumLangChat.fr);
  const [runnedTools, setRunnedTools] = useState<string[]>([]);
  const [activeToolState, setActiveTool] = useState<string | null>(null);

  useEffect(() => {
    if (isAutoScroll && refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [messages, typingMessage, query]);

  useEffect(() => {
    setRunnedTools(tools);
    setActiveTool(activeTool);
  }, [tools, activeTool]);

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
    setRunnedTools([]);
    setTypingMessage(null);

    onEvent && onEvent("messageSent", query);

    const language = lang === EnumLangChat.fr ? "fr" : "us";

    sendMessage(query, language, {
      onError: (error) => {
        onEvent && onEvent("onError", error);
        setError(error);
        setIsTyping(false);
        setTypingMessage(null);
        setIsPending(false);
        setRunnedTools([]);
        console.error(error);
      },
      onFinish: (data) => {
        setIsPending(false);
        setIsTyping(false);
        setTypingMessage(null);
        setRunnedTools([]);
        onEvent && onEvent("messageReceived", data);
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
        if (!displayTools) {
          if (message.trim().length > 0) {
            setIsPending(false);
          }
        } else {
          setIsPending(false);
        }

        setTypingMessage((value) => ({
          id: `message_${value?.id || messages.length + 1}`,
          message: {
            role: "assistant",
            content: message,
          },
          created: Date.now(),
          conversation_id: "",
          fiability: "DEFAULT",
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
          },
        }));
      },
    });
  };

  const handleResetConversation = () => {
    setMessages([]);
    setTypingMessage(null);
    setQuery("");
    createToken(true);
  };

  const handleFiabilityMessage = async (
    message: IMessage,
    fiability: TFiabilityMessage,
  ) => {
    const data = await handleFiabilityMessageIA(message, fiability);
    if (!data) return;

    setMessages((prev) =>
      prev.map((m) =>
        m.message_id === message.message_id
          ? {
              ...m,
              fiability,
            }
          : m,
      ),
    );
  };

  return (
    <div
      className={classNames(styles["devana-conversation-container"], {
        [styles["dark"] as string]: theme === "dark",
      })}
      style={{
        backgroundImage: `linear-gradient(140deg, ${chatBackgroundColor}, ${chatBackgroundSecondaryColor})`,
      }}
    >
      <Lang value={lang} onChange={(value) => setLang(value)} />
      <div ref={refScroll} className={styles.scrollZone}>
        <div style={{ height: "26px" }} />
        <div className={styles.messages}>
          {welcomeMessage &&
            Object.keys(welcomeMessage)
              .filter((key): key is TLangKey => key === lang.toLowerCase())
              .map((l) => (
                <div
                  key={l}
                  className={styles[`welcome-message`]}
                  style={{
                    backgroundColor: assistantBackgroundColor,
                    color: assistantTextColor,
                  }}
                >
                  {welcomeMessage[l]}
                </div>
              ))}
          {messages
            .filter((e) => e.message.content)
            .sort((a, b) => a.created - b.created)
            .map((m) => (
              <Message
                key={`message_${m.id}-${messages.length}`}
                message={m}
                assistantBackgroundColor={assistantBackgroundColor}
                assistantTextColor={assistantTextColor}
                userBackgroundColor={userBackgroundColor}
                userTextColor={userTextColor}
                handleFiabilityMessage={handleFiabilityMessage}
                displayActions={displayActions}
              />
            ))}
          {typingMessage && !isPending && (
            <TypingMessage
              key={`message_${typingMessage.id}`}
              message={typingMessage}
              displayTools={displayTools}
              tools={tools}
              activeToolState={activeToolState}
              runnedTools={runnedTools}
              assistantBackgroundColor={assistantBackgroundColor}
              assistantTextColor={assistantTextColor}
              userTextColor={userTextColor}
            />
          )}
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
          onReset={handleResetConversation}
          showResetButton={!!messages.length}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          intls={intls}
          theme={theme}
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
