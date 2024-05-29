import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useChat } from "../hooks/useChat.js";
import styles from "./Conversation.module.css.js";
import { useApi } from "../hooks/useApi.js";
import MuiTextField from "./TextField.js";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config.js";
import { hexToTransparentHex } from "../commons.js";
import * as flags from "country-flag-icons/string/3x2";
const Conversation = ({
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
  hiddenWatermark
}) => {
  const [tryCreateToken, setTryCreateToken] = useState(0);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = useState([]);
  const { token, createToken, getConversationHistory } = useApi(publicKey, {});
  const { sendMessage } = useChat({ userToken: token });
  const refScroll = React.useRef(null);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  const [typingMessage, setTypingMessage] = React.useState(
    null
  );
  const [error, setError] = React.useState(null);
  const [isPending, setIsPending] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [lang, setLang] = useState("FR");
  useEffect(() => {
    if (isAutoScroll && refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [messages, typingMessage, query]);
  useEffect(() => {
    if (!refScroll.current)
      return;
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
    if (!token)
      return;
    getConversationHistory().then((data) => {
      try {
        setMessages(data);
      } catch {
      }
    });
  }, [token]);
  useEffect(() => {
    if (token)
      return;
    setTryCreateToken(0);
    createToken();
  }, [publicKey]);
  useEffect(() => {
    if (token)
      return;
    if (tryCreateToken > 1)
      return;
    setTryCreateToken((prev) => prev + 1);
    createToken();
  }, [token, tryCreateToken]);
  const handleSubmitMessage = () => {
    if (!query || isTyping)
      return;
    setMessages((prev) => [
      ...prev,
      {
        id: `message_${prev.length + 1}`,
        message: {
          role: "user",
          content: query
        },
        created: Date.now(),
        conversation_id: "",
        usage: {
          prompt_tokens: 0,
          completion_tokens: 0,
          total_tokens: 0
        }
      }
    ]);
    setIsPending(true);
    setQuery("");
    setError(null);
    setIsTyping(true);
    sendMessage(query, {
      onError: (error2) => {
        setError(error2);
        setIsTyping(false);
        setIsPending(false);
        console.error(error2);
      },
      onFinish: (data) => {
        setIsTyping(false);
        getConversationHistory().then((data2) => {
          try {
            setTypingMessage(null);
            setMessages(data2);
          } catch {
          }
        });
      },
      onMessage: (message) => {
        setIsPending(false);
        setTypingMessage((value) => ({
          id: `message_${value?.id || messages.length + 1}`,
          message: {
            role: "assistant",
            content: message
          },
          created: Date.now(),
          conversation_id: "",
          usage: {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0
          }
        }));
      }
    });
  };
  const handleResetConversation = () => {
    setMessages([]);
    setTypingMessage(null);
    setQuery("");
    createToken(true);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: styles["devana-conversation-container"],
      style: {
        backgroundImage: `linear-gradient(140deg, ${chatBackgroundColor}, ${chatBackgroundSecondaryColor})`
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: styles["lang-selector"], children: ["FR", "US"].sort((a, b) => lang === a ? -1 : lang === b ? 1 : 0).map((l) => /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => setLang(l),
            style: {
              opacity: l === lang ? 1 : 0.5
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                dangerouslySetInnerHTML: {
                  __html: flags[l]
                }
              }
            )
          },
          l
        )) }),
        /* @__PURE__ */ jsxs("div", { ref: refScroll, className: styles.scrollZone, children: [
          /* @__PURE__ */ jsx("div", { style: { height: "26px" } }),
          /* @__PURE__ */ jsxs("div", { className: styles.messages, children: [
            welcomeMessage && /* @__PURE__ */ jsx(
              "div",
              {
                className: styles[`message-assistant`],
                style: {
                  backgroundColor: assistantBackgroundColor,
                  color: assistantTextColor
                },
                children: welcomeMessage
              }
            ),
            [...messages, ...typingMessage ? [typingMessage] : []].filter((e) => e.message.content).sort((a, b) => a.created - b.created).map((m, i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: styles[`message-${m.message.role}`],
                style: m.message.role === "assistant" ? {
                  backgroundColor: hexToTransparentHex(
                    assistantBackgroundColor || "#ffffff",
                    0.8
                  ),
                  color: assistantTextColor
                } : {
                  backgroundColor: hexToTransparentHex(
                    userBackgroundColor || "#ffffff",
                    0.8
                  ),
                  color: userTextColor
                },
                children: /* @__PURE__ */ jsx(
                  MarkdownPreview,
                  {
                    ...{
                      ...MARKDOWN_PROPS,
                      style: {
                        ...MARKDOWN_PROPS.style,
                        color: m.message.role === "assistant" ? assistantTextColor : userTextColor
                      }
                    },
                    source: m.message.content
                  }
                )
              },
              `message_${m.id}`
            )),
            error && /* @__PURE__ */ jsx(
              "div",
              {
                className: styles[`message-assistant`],
                style: {
                  backgroundColor: hexToTransparentHex("#ff0000", 0.8),
                  color: "#ffffff"
                },
                children: error
              }
            ),
            isPending && /* @__PURE__ */ jsx(
              "div",
              {
                className: styles[`message-assistant`],
                style: {
                  backgroundColor: assistantBackgroundColor,
                  color: assistantTextColor
                },
                children: /* @__PURE__ */ jsxs("div", { className: styles.typing, children: [
                  /* @__PURE__ */ jsx("div", { className: styles.dot }),
                  /* @__PURE__ */ jsx("div", { className: styles.dot }),
                  /* @__PURE__ */ jsx("div", { className: styles.dot })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { style: { height: "50px" } })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles["devana-input"], children: [
          /* @__PURE__ */ jsx(
            MuiTextField,
            {
              value: query,
              onChange: (value) => setQuery(value),
              onSubmit: handleSubmitMessage,
              onReset: handleResetConversation,
              showResetButton: !!messages.length,
              buttonBackgroundColor,
              buttonTextColor,
              intls
            }
          ),
          !hiddenWatermark && /* @__PURE__ */ jsxs("div", { className: styles.poweredBy, children: [
            "Propulsé par",
            " ",
            /* @__PURE__ */ jsx("a", { href: "https://devana.ai", target: "_blank", rel: "noreferrer", children: "Devana" })
          ] })
        ] })
      ]
    }
  );
};
export {
  Conversation
};
