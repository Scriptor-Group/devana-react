"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const react_1 = __importDefault(require("react"));
const useChat_1 = require("../hooks/useChat");
const react_markdown_preview_1 = __importDefault(require("@uiw/react-markdown-preview"));
const Conversation = ({ metadata, children, aiId, chatId, }) => {
    const [currentChatId, setCurrentChatId] = react_1.default.useState(chatId);
    const [query, setQuery] = react_1.default.useState("");
    const [messages, setMessages] = react_1.default.useState([]);
    const { sendMessage } = (0, useChat_1.useChat)({
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
            onMessage: (message) => {
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
            onError: (error) => {
                console.log(error);
            },
        });
    };
    return (react_1.default.createElement("div", { style: {
            width: "100%",
            height: "100%",
        } },
        react_1.default.createElement("div", null, messages.map((m, i) => (react_1.default.createElement("div", { key: `message_${i}`, style: {
                display: "flex",
                justifyContent: m.type === "user" ? "flex-end" : "flex-start",
            } },
            react_1.default.createElement(react_markdown_preview_1.default, { source: m.message, skipHtml: true, style: {
                    maxWidth: "70%",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                    backgroundColor: m.type === "user" ? "lightblue" : "lightgreen",
                } }))))),
        react_1.default.createElement("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value) }),
        react_1.default.createElement("button", { onClick: handleSubmitMessage }, "Send")));
};
exports.Conversation = Conversation;
