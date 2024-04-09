var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useRef, useState } from "react";
import { API_URL, API_VERSION } from "../config";
/**
 * Custom hook for handling chat functionality.
 * @param {Object} options - The options object.
 * @param {string | null} options.userToken - The user token.
 * @returns {Object} - An object containing the sendMessage function, generating state, and handleStop function.
 */
export var useChat = function (_a) {
    var userToken = _a.userToken;
    var _b = useState(false), generating = _b[0], setGenerating = _b[1];
    var eventSource = useRef(null);
    useEffect(function () {
        // if component is unmounted, close event source
        return function () {
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
    var sendMessage = function (message, options) { return __awaiter(void 0, void 0, void 0, function () {
        var url, response, reader, loop, fullMessage, _a, done, value, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!userToken) {
                        options.onError && options.onError("No user token");
                        return [2 /*return*/];
                    }
                    setGenerating(true);
                    url = "".concat(API_URL).concat(API_VERSION, "/chat/conversation/public/message");
                    return [4 /*yield*/, fetch(url, {
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
                        })];
                case 1:
                    response = _b.sent();
                    if (response.status !== 200) {
                        setGenerating(false);
                        options.onError && options.onError(response.statusText);
                        return [2 /*return*/];
                    }
                    if (!response.body) {
                        setGenerating(false);
                        options.onError && options.onError("No response body");
                        return [2 /*return*/];
                    }
                    reader = response.body.getReader();
                    loop = true;
                    fullMessage = "";
                    _b.label = 2;
                case 2:
                    if (!loop) return [3 /*break*/, 7];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, reader.read()];
                case 4:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 7]; // Exit the loop if there are no more chunks
                    token = new TextDecoder().decode(value);
                    if (token.includes("DONE")) {
                        console.log("data", fullMessage);
                        options.onFinish && options.onFinish({ text: fullMessage });
                        return [3 /*break*/, 7];
                    }
                    fullMessage += token;
                    console.log("data", fullMessage);
                    options.onMessage && options.onMessage(fullMessage);
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    if (error_1 instanceof Error && error_1.name === "AbortError") {
                        console.log("Aborted");
                        return [3 /*break*/, 7];
                    }
                    else if (error_1 instanceof Error) {
                        console.error(error_1);
                        options.onError && options.onError(error_1.message);
                        return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 7];
                case 6: return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    /**
     * Stops the chat functionality.
     */
    var handleStop = function () {
        if (eventSource === null || eventSource === void 0 ? void 0 : eventSource.current) {
            eventSource.current.close();
            eventSource.current = null;
        }
        setGenerating(false);
    };
    return { sendMessage: sendMessage, generating: generating, handleStop: handleStop };
};
