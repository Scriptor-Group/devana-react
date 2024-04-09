"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useState } from "react";
import { useChat } from "../hooks/useChat";
import styles from "./Conversation.module.css";
import { useApi } from "../hooks/useApi";
import MuiTextField from "./TextField";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import { hexToTransparentHex } from "../commons";
export var Conversation = function (_a) {
    var publicKey = _a.publicKey, welcomeMessage = _a.welcomeMessage, assistantBackgroundColor = _a.assistantBackgroundColor, assistantTextColor = _a.assistantTextColor, userBackgroundColor = _a.userBackgroundColor, userTextColor = _a.userTextColor, chatBackgroundColor = _a.chatBackgroundColor, chatBackgroundSecondaryColor = _a.chatBackgroundSecondaryColor, buttonBackgroundColor = _a.buttonBackgroundColor, buttonTextColor = _a.buttonTextColor, intls = _a.intls, hiddenWatermark = _a.hiddenWatermark;
    var _b = useState(0), tryCreateToken = _b[0], setTryCreateToken = _b[1];
    var _c = React.useState(""), query = _c[0], setQuery = _c[1];
    var _d = useState([]), messages = _d[0], setMessages = _d[1];
    var _e = useApi(publicKey, {}), token = _e.token, createToken = _e.createToken, getConversationHistory = _e.getConversationHistory;
    var sendMessage = useChat({ userToken: token }).sendMessage;
    var refScroll = React.useRef(null);
    var _f = React.useState(true), isAutoScroll = _f[0], setIsAutoScroll = _f[1];
    var _g = React.useState(null), typingMessage = _g[0], setTypingMessage = _g[1];
    var _h = React.useState(null), error = _h[0], setError = _h[1];
    var _j = React.useState(false), isPending = _j[0], setIsPending = _j[1];
    var _k = React.useState(false), isTyping = _k[0], setIsTyping = _k[1];
    useEffect(function () {
        if (isAutoScroll && refScroll.current) {
            refScroll.current.scrollTop = refScroll.current.scrollHeight;
        }
    }, [messages, typingMessage, query]);
    useEffect(function () {
        if (!refScroll.current)
            return;
        var scroll = refScroll.current;
        var handleScroll = function () {
            if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 20) {
                setIsAutoScroll(true);
            }
            else {
                setIsAutoScroll(false);
            }
        };
        scroll.addEventListener("scroll", handleScroll);
        return function () { return scroll.removeEventListener("scroll", handleScroll); };
    }, [refScroll]);
    useEffect(function () {
        if (!token)
            return;
        getConversationHistory().then(function (data) {
            try {
                setMessages(data);
            }
            catch (_a) {
                // Silently fail
            }
        });
    }, [token]);
    useEffect(function () {
        if (token)
            return;
        setTryCreateToken(0);
        createToken();
    }, [publicKey]);
    useEffect(function () {
        if (token)
            return;
        if (tryCreateToken > 1)
            return;
        setTryCreateToken(function (prev) { return prev + 1; });
        createToken();
    }, [token, tryCreateToken]);
    var handleSubmitMessage = function () {
        if (!query || isTyping)
            return;
        setMessages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [
            {
                id: "message_".concat(prev.length + 1),
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
        ], false); });
        setIsPending(true);
        setQuery("");
        setError(null);
        setIsTyping(true);
        sendMessage(query, {
            onError: function (error) {
                setError(error);
                setIsTyping(false);
                console.error(error);
            },
            onFinish: function (data) {
                setIsTyping(false);
                getConversationHistory().then(function (data) {
                    try {
                        setTypingMessage(null);
                        setMessages(data);
                    }
                    catch (_a) {
                        // Silently fail
                    }
                });
            },
            onMessage: function (message) {
                setIsPending(false);
                setTypingMessage(function (value) { return ({
                    id: "message_".concat((value === null || value === void 0 ? void 0 : value.id) || messages.length + 1),
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
                }); });
            },
        });
    };
    return (React.createElement("div", { className: styles["devana-conversation-container"], style: {
            backgroundImage: "linear-gradient(140deg, ".concat(chatBackgroundColor, ", ").concat(chatBackgroundSecondaryColor, ")"),
        } },
        React.createElement("div", { ref: refScroll, className: styles.scrollZone },
            React.createElement("div", { style: { height: "26px" } }),
            React.createElement("div", { className: styles.messages },
                welcomeMessage && (React.createElement("div", { className: styles["message-assistant"], style: {
                        backgroundColor: assistantBackgroundColor,
                        color: assistantTextColor,
                    } }, welcomeMessage)),
                __spreadArray(__spreadArray([], messages, true), (typingMessage ? [typingMessage] : []), true).filter(function (e) { return e.message.content; })
                    .sort(function (a, b) { return a.created - b.created; })
                    .map(function (m, i) { return (React.createElement("div", { key: "message_".concat(m.id), className: styles["message-".concat(m.message.role)], style: m.message.role === "assistant"
                        ? {
                            backgroundColor: hexToTransparentHex(assistantBackgroundColor || "#ffffff", 0.8),
                            color: assistantTextColor,
                        }
                        : {
                            backgroundColor: hexToTransparentHex(userBackgroundColor || "#ffffff", 0.8),
                            color: userTextColor,
                        } },
                    React.createElement(MarkdownPreview, __assign({}, MARKDOWN_PROPS, { style: __assign(__assign({}, MARKDOWN_PROPS.style), { color: m.message.role === "assistant"
                                ? assistantTextColor
                                : userTextColor }), source: m.message.content })))); }),
                error && (React.createElement("div", { className: styles["message-assistant"], style: {
                        backgroundColor: hexToTransparentHex("#ff0000", 0.8),
                        color: "#ffffff",
                    } }, error)),
                isPending && (React.createElement("div", { className: styles["message-assistant"], style: {
                        backgroundColor: assistantBackgroundColor,
                        color: assistantTextColor,
                    } },
                    React.createElement("div", { className: styles.typing },
                        React.createElement("div", { className: styles.dot }),
                        React.createElement("div", { className: styles.dot }),
                        React.createElement("div", { className: styles.dot }))))),
            React.createElement("div", { style: { height: "50px" } })),
        React.createElement("div", { className: styles["devana-input"] },
            React.createElement(MuiTextField, { value: query, onChange: function (value) { return setQuery(value); }, onSubmit: handleSubmitMessage, buttonBackgroundColor: buttonBackgroundColor, buttonTextColor: buttonTextColor, intls: intls }),
            !hiddenWatermark && (React.createElement("div", { className: styles.poweredBy },
                "Propuls\u00E9 par",
                " ",
                React.createElement("a", { href: "https://devana.ai", target: "_blank", rel: "noreferrer" }, "Devana"))))));
};
