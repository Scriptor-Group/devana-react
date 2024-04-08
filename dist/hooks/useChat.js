"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChat = void 0;
const react_1 = require("react");
const config_1 = require("../config");
/**
 * Custom hook for handling chat functionality.
 * @param {Object} options - The options object.
 * @param {string | null} options.userToken - The user token.
 * @returns {Object} - An object containing the sendMessage function, generating state, and handleStop function.
 */
const useChat = ({ userToken }) => {
    const [generating, setGenerating] = (0, react_1.useState)(false);
    const eventSource = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        // if component is unmounted, close event source
        return () => {
            if (eventSource === null || eventSource === void 0 ? void 0 : eventSource.current) {
                eventSource.current.close();
                eventSource.current = null;
            }
        };
    }, []);
    /**
     * Sends a message to the chat server.
     * @param {string} message - The message to send.
     * @param {Object} options - The options object.
     * @param {Function} options.onMessage - The callback function to handle incoming messages.
     * @param {Function} options.onFinish - The callback function to handle when the message is finished.
     * @param {Function} options.onError - The callback function to handle errors.
     */
    const sendMessage = (message, options) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userToken) {
            options.onError && options.onError("No user token");
            return;
        }
        setGenerating(true);
        const url = `${config_1.API_URL}${config_1.API_VERSION}/chat/conversation/public/message`;
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stream: true,
                client_token: userToken,
                messages: [
                    {
                        role: "user",
                        content: message,
                    },
                ],
            }),
        });
        if (response.status !== 200) {
            setGenerating(false);
            options.onError && options.onError(response.statusText);
            return;
        }
        if (!response.body) {
            setGenerating(false);
            options.onError && options.onError("No response body");
            return;
        }
        const reader = response.body.getReader(); // Convert ReadableStream to ReadableStreamDefaultReader
        const loop = true;
        let fullMessage = "";
        while (loop) {
            try {
                const { done, value } = yield reader.read(); // Read the next chunk
                if (done)
                    break; // Exit the loop if there are no more chunks
                const token = new TextDecoder().decode(value); // Convert the chunk to text
                if (token.includes("DONE")) {
                    console.log("data", fullMessage);
                    options.onFinish && options.onFinish({ text: fullMessage });
                    break;
                }
                fullMessage += token;
                console.log("data", fullMessage);
                options.onMessage && options.onMessage(fullMessage);
            }
            catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    console.log("Aborted");
                    break;
                }
                else if (error instanceof Error) {
                    console.error(error);
                    options.onError && options.onError(error.message);
                    break;
                }
                break;
            }
        }
    });
    /**
     * Stops the chat functionality.
     */
    const handleStop = () => {
        if (eventSource === null || eventSource === void 0 ? void 0 : eventSource.current) {
            eventSource.current.close();
            eventSource.current = null;
        }
        setGenerating(false);
    };
    return { sendMessage, generating, handleStop };
};
exports.useChat = useChat;
