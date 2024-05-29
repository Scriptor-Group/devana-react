"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const useChat = require("../hooks/useChat.cjs");
const Conversation_module = require("./Conversation.module.css.cjs");
const useApi = require("../hooks/useApi.cjs");
const TextField = require("./TextField.cjs");
const MarkdownPreview = require("@uiw/react-markdown-preview");
const config = require("../config.cjs");
const commons = require("../commons.cjs");
const flags = require("country-flag-icons/string/3x2");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const flags__namespace = /* @__PURE__ */ _interopNamespaceDefault(flags);
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
  const [tryCreateToken, setTryCreateToken] = React.useState(0);
  const [query, setQuery] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const { token, createToken, getConversationHistory } = useApi.useApi(publicKey, {});
  const { sendMessage } = useChat.useChat({ userToken: token });
  const refScroll = React.useRef(null);
  const [isAutoScroll, setIsAutoScroll] = React.useState(true);
  const [typingMessage, setTypingMessage] = React.useState(
    null
  );
  const [error, setError] = React.useState(null);
  const [isPending, setIsPending] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [lang, setLang] = React.useState("FR");
  React.useEffect(() => {
    if (isAutoScroll && refScroll.current) {
      refScroll.current.scrollTop = refScroll.current.scrollHeight;
    }
  }, [messages, typingMessage, query]);
  React.useEffect(() => {
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
  React.useEffect(() => {
    if (!token)
      return;
    getConversationHistory().then((data) => {
      try {
        setMessages(data);
      } catch {
      }
    });
  }, [token]);
  React.useEffect(() => {
    if (token)
      return;
    setTryCreateToken(0);
    createToken();
  }, [publicKey]);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: Conversation_module.default["devana-conversation-container"],
      style: {
        backgroundImage: `linear-gradient(140deg, ${chatBackgroundColor}, ${chatBackgroundSecondaryColor})`
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: Conversation_module.default["lang-selector"], children: ["FR", "US"].sort((a, b) => lang === a ? -1 : lang === b ? 1 : 0).map((l) => /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            onClick: () => setLang(l),
            style: {
              opacity: l === lang ? 1 : 0.5
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                dangerouslySetInnerHTML: {
                  __html: flags__namespace[l]
                }
              }
            )
          },
          l
        )) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: refScroll, className: Conversation_module.default.scrollZone, children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: "26px" } }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Conversation_module.default.messages, children: [
            welcomeMessage && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: Conversation_module.default[`message-assistant`],
                style: {
                  backgroundColor: assistantBackgroundColor,
                  color: assistantTextColor
                },
                children: welcomeMessage
              }
            ),
            [...messages, ...typingMessage ? [typingMessage] : []].filter((e) => e.message.content).sort((a, b) => a.created - b.created).map((m, i) => /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: Conversation_module.default[`message-${m.message.role}`],
                style: m.message.role === "assistant" ? {
                  backgroundColor: commons.hexToTransparentHex(
                    assistantBackgroundColor || "#ffffff",
                    0.8
                  ),
                  color: assistantTextColor
                } : {
                  backgroundColor: commons.hexToTransparentHex(
                    userBackgroundColor || "#ffffff",
                    0.8
                  ),
                  color: userTextColor
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  MarkdownPreview,
                  {
                    ...{
                      ...config.MARKDOWN_PROPS,
                      style: {
                        ...config.MARKDOWN_PROPS.style,
                        color: m.message.role === "assistant" ? assistantTextColor : userTextColor
                      }
                    },
                    source: m.message.content
                  }
                )
              },
              `message_${m.id}`
            )),
            error && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: Conversation_module.default[`message-assistant`],
                style: {
                  backgroundColor: commons.hexToTransparentHex("#ff0000", 0.8),
                  color: "#ffffff"
                },
                children: error
              }
            ),
            isPending && /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: Conversation_module.default[`message-assistant`],
                style: {
                  backgroundColor: assistantBackgroundColor,
                  color: assistantTextColor
                },
                children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Conversation_module.default.typing, children: [
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: Conversation_module.default.dot }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: Conversation_module.default.dot }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: Conversation_module.default.dot })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: "50px" } })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Conversation_module.default["devana-input"], children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            TextField,
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
          !hiddenWatermark && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: Conversation_module.default.poweredBy, children: [
            "Propulsé par",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("a", { href: "https://devana.ai", target: "_blank", rel: "noreferrer", children: "Devana" })
          ] })
        ] })
      ]
    }
  );
};
exports.Conversation = Conversation;
