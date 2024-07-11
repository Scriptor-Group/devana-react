"use client";

import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import styles from "./Conversation.module.css";
import { useApi } from "../hooks/useApi";
import {
  EnumFiabilityMessage,
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
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import { hexToTransparentHex } from "../commons";
import * as flags from "country-flag-icons/string/3x2";
import ThumbDownIcon from "../assets/thumb-down";
import ThumbUpIcon from "../assets/thumb-up";
import classNames from "classnames";
import GlobalSearch from "../assets/tools/GlobalSearch";
import { toolsIcons } from "../utils/tools";

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

    sendMessage(query, {
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
    console.log("handleResetConversation");
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
      <div className={styles["lang-selector"]}>
        {Object.values(EnumLangChat)
          .sort((a, b) => (a === lang ? -1 : b === lang ? 1 : 0))
          .map((l) => (
            <div
              key={l}
              onClick={() => setLang(l)}
              style={{
                opacity: l === lang ? 1 : 0.5,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: flags[l as keyof typeof flags],
                }}
              />
            </div>
          ))}
      </div>
      <div ref={refScroll} className={styles.scrollZone}>
        <div style={{ height: "26px" }} />
        <div className={styles.messages}>
          {welcomeMessage &&
            Object.keys(welcomeMessage)
              .filter((key): key is TLangKey => key === lang.toLowerCase())
              .map((l) => (
                <div
                  key={l}
                  className={styles[`message-assistant`]}
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
                        display: "flex",
                        flexDirection: "column",
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

                {displayActions && m.message.role === "assistant" && (
                  <div className={styles["actions-container"]}>
                    {Object.values(EnumFiabilityMessage).map(
                      (fiability_key) => (
                        <div
                          onClick={() => {
                            const send =
                              m.fiability === fiability_key
                                ? "DEFAULT"
                                : fiability_key;

                            handleFiabilityMessage(m, send);
                          }}
                          className={styles["btn-container-fiability"]}
                        >
                          {fiability_key === EnumFiabilityMessage.BAD ? (
                            <ThumbDownIcon
                              active={m.fiability === fiability_key}
                            />
                          ) : (
                            <ThumbUpIcon
                              active={m.fiability === fiability_key}
                            />
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          {typingMessage && !isPending && (
            <div
              key={`message_${typingMessage.id}`}
              className={styles[`message-${typingMessage.message.role}`]}
              style={{
                backgroundColor: hexToTransparentHex(
                  assistantBackgroundColor || "#ffffff",
                  0.8,
                ),
                color: assistantTextColor,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {runnedTools &&
                typingMessage.message.content.trim().length === 0 &&
                displayTools && (
                  <div className={styles["tool-container"]}>
                    <div
                      className={classNames(styles["tool-block"], {
                        [styles["tool-working"] as string]: tools.length === 0,
                      })}
                    />

                    {runnedTools.map((tool) => (
                      <div
                        className={classNames(styles["tool-block"], {
                          [styles["tool-working"] as string]:
                            tool === activeToolState,
                        })}
                      >
                        {toolsIcons(tool)}
                      </div>
                    ))}
                  </div>
                )}
              <MarkdownPreview
                {...{
                  ...MARKDOWN_PROPS,
                  style: {
                    ...MARKDOWN_PROPS.style,
                    color:
                      typingMessage.message.role === "assistant"
                        ? assistantTextColor
                        : userTextColor,
                  },
                }}
                source={typingMessage.message.content}
              />
            </div>
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
