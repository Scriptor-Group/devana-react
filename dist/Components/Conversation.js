"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const react_1 = __importStar(require("react"));
const useChat_1 = require("../hooks/useChat");
const Conversation_module_css_1 = __importDefault(require("./Conversation.module.css"));
const useApi_1 = require("../hooks/useApi");
const TextField_1 = __importDefault(require("./TextField"));
const react_markdown_preview_1 = __importDefault(require("@uiw/react-markdown-preview"));
const config_1 = require("../config");
const commons_1 = require("../commons");
const Conversation = ({ publicKey, welcomeMessage, assistantBackgroundColor, assistantTextColor, userBackgroundColor, userTextColor, chatBackgroundColor, chatBackgroundSecondaryColor, buttonBackgroundColor, buttonTextColor, intls, }) => {
    const [tryCreateToken, setTryCreateToken] = (0, react_1.useState)(0);
    const [query, setQuery] = react_1.default.useState("");
    const [messages, setMessages] = (0, react_1.useState)([]);
    const { token, createToken, getConversationHistory } = (0, useApi_1.useApi)(publicKey, {});
    const { sendMessage } = (0, useChat_1.useChat)({ userToken: token });
    const refScroll = react_1.default.useRef(null);
    const [isAutoScroll, setIsAutoScroll] = react_1.default.useState(true);
    const [typingMessage, setTypingMessage] = react_1.default.useState(null);
    (0, react_1.useEffect)(() => {
        if (isAutoScroll && refScroll.current) {
            refScroll.current.scrollTop = refScroll.current.scrollHeight;
        }
    }, [messages, typingMessage, query]);
    (0, react_1.useEffect)(() => {
        if (!refScroll.current)
            return;
        const scroll = refScroll.current;
        const handleScroll = () => {
            // -20px
            if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 20) {
                setIsAutoScroll(true);
            }
            else {
                setIsAutoScroll(false);
            }
        };
        scroll.addEventListener("scroll", handleScroll);
        return () => scroll.removeEventListener("scroll", handleScroll);
    }, [refScroll]);
    (0, react_1.useEffect)(() => {
        if (!token)
            return;
        getConversationHistory().then((data) => {
            try {
                setMessages(data);
            }
            catch (_a) {
                // Silently fail
            }
        });
    }, [token]);
    (0, react_1.useEffect)(() => {
        if (token)
            return;
        setTryCreateToken(0);
        createToken();
    }, [publicKey]);
    (0, react_1.useEffect)(() => {
        if (token)
            return;
        if (tryCreateToken > 1)
            return;
        setTryCreateToken((prev) => prev + 1);
        createToken();
    }, [token, tryCreateToken]);
    const handleSubmitMessage = () => {
        if (!query)
            return;
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
        setQuery("");
        sendMessage(query, {
            onError: (error) => console.error(error),
            onFinish: (data) => {
                getConversationHistory().then((data) => {
                    try {
                        setTypingMessage(null);
                        setMessages(data);
                    }
                    catch (_a) {
                        // Silently fail
                    }
                });
            },
            onMessage: (message) => {
                setTypingMessage((value) => ({
                    id: `message_${(value === null || value === void 0 ? void 0 : value.id) || messages.length + 1}`,
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
    return (react_1.default.createElement("div", { className: Conversation_module_css_1.default["devana-conversation-container"], style: {
            backgroundImage: `linear-gradient(140deg, ${chatBackgroundColor}, ${chatBackgroundSecondaryColor})`,
        }, ref: refScroll },
        react_1.default.createElement("div", { className: Conversation_module_css_1.default.messages },
            welcomeMessage && (react_1.default.createElement("div", { className: Conversation_module_css_1.default[`message-assistant`], style: {
                    backgroundColor: assistantBackgroundColor,
                    color: assistantTextColor,
                } }, welcomeMessage)),
            [...messages, ...(typingMessage ? [typingMessage] : [])]
                .filter((e) => e.message.content)
                .sort((a, b) => a.created - b.created)
                .map((m, i) => (react_1.default.createElement("div", { key: `message_${m.id}`, className: Conversation_module_css_1.default[`message-${m.message.role}`], style: m.message.role === "assistant"
                    ? {
                        backgroundColor: (0, commons_1.hexToTransparentHex)(assistantBackgroundColor || "#ffffff", 0.8),
                        color: assistantTextColor,
                    }
                    : {
                        backgroundColor: (0, commons_1.hexToTransparentHex)(userBackgroundColor || "#ffffff", 0.8),
                        color: userTextColor,
                    } },
                react_1.default.createElement(react_markdown_preview_1.default, Object.assign({}, config_1.MARKDOWN_PROPS, { style: Object.assign(Object.assign({}, config_1.MARKDOWN_PROPS.style), { color: m.message.role === "assistant"
                            ? assistantTextColor
                            : userTextColor }), source: m.message.content })))))),
        react_1.default.createElement("div", { style: { height: "50px" } }),
        react_1.default.createElement("div", { className: Conversation_module_css_1.default["devana-input"] },
            react_1.default.createElement(TextField_1.default, { value: query, onChange: (value) => setQuery(value), onSubmit: handleSubmitMessage, buttonBackgroundColor: buttonBackgroundColor, buttonTextColor: buttonTextColor, intls: intls }),
            react_1.default.createElement("div", { className: Conversation_module_css_1.default.poweredBy },
                "Propuls\u00E9 par",
                react_1.default.createElement("a", { href: "https://devana.ai", target: "_blank", rel: "noreferrer" }, "Devana")))));
};
exports.Conversation = Conversation;
