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
exports.useApi = void 0;
const react_1 = require("react");
const config_1 = require("../config");
const commons_1 = require("../commons");
/**
 * Custom hook for interacting with an API.
 * @param publicKey - The public key used for authentication.
 * @param options - Optional configuration options.
 * @returns An object containing the token, createToken function, and getConversationHistory function.
 */
const useApi = (publicKey, options) => {
    const [token, setToken] = (0, react_1.useState)((options === null || options === void 0 ? void 0 : options.token) || (0, commons_1.getTokenCookie)() || null);
    /**
     * Creates a token by making a POST request to the API.
     * The token is retrieved from the response data and stored in the state.
     * If the token is successfully retrieved, it is also stored in a cookie.
     * @returns A Promise that resolves to the token string.
     */
    const createToken = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!publicKey)
            return null;
        const route = "/chat/conversation/public/message/token";
        const url = `${config_1.API_URL}${config_1.API_VERSION}${route}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${publicKey}`,
            },
        });
        const data = yield response.json();
        const _token = data === null || data === void 0 ? void 0 : data.token;
        if (_token) {
            (0, commons_1.setTokenCookie)(_token);
            setToken(_token);
        }
        return _token;
    });
    /**
     * Retrieves the conversation history from the server.
     * @returns A promise that resolves to an array of messages.
     */
    const getConversationHistory = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!token)
            return [];
        const route = `/chat/conversation/public/messages/:token`;
        const url = `${config_1.API_URL}${config_1.API_VERSION}${route.replace(":token", token || "")}`;
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = yield response.json();
        return (data === null || data === void 0 ? void 0 : data.messages) || [];
    });
    return {
        token,
        createToken,
        getConversationHistory,
    };
};
exports.useApi = useApi;
