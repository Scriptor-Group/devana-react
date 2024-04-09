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
import { useState } from "react";
import { API_URL, API_VERSION } from "../config";
import { getTokenCookie, setTokenCookie } from "../commons";
/**
 * Custom hook for interacting with an API.
 * @param publicKey - The public key used for authentication.
 * @param options - Optional configuration options.
 * @returns An object containing the token, createToken function, and getConversationHistory function.
 */
export var useApi = function (publicKey, options) {
    var _a = useState((options === null || options === void 0 ? void 0 : options.token) || getTokenCookie() || null), token = _a[0], setToken = _a[1];
    /**
     * Creates a token by making a POST request to the API.
     * The token is retrieved from the response data and stored in the state.
     * If the token is successfully retrieved, it is also stored in a cookie.
     * @returns A Promise that resolves to the token string.
     */
    var createToken = function () { return __awaiter(void 0, void 0, void 0, function () {
        var route, url, response, data, _token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!publicKey)
                        return [2 /*return*/, null];
                    route = "/chat/conversation/public/message/token";
                    url = "".concat(API_URL).concat(API_VERSION).concat(route);
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(publicKey),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    _token = data === null || data === void 0 ? void 0 : data.token;
                    if (_token) {
                        setTokenCookie(_token);
                        setToken(_token);
                    }
                    return [2 /*return*/, _token];
            }
        });
    }); };
    /**
     * Retrieves the conversation history from the server.
     * @returns A promise that resolves to an array of messages.
     */
    var getConversationHistory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var route, url, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!token)
                        return [2 /*return*/, []];
                    route = "/chat/conversation/public/messages/:token";
                    url = "".concat(API_URL).concat(API_VERSION).concat(route.replace(":token", token || ""));
                    return [4 /*yield*/, fetch(url, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, (data === null || data === void 0 ? void 0 : data.messages) || []];
            }
        });
    }); };
    return {
        token: token,
        createToken: createToken,
        getConversationHistory: getConversationHistory,
    };
};
