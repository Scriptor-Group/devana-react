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
const API_URL = `https://api.devana.ai`;
const useChat = ({ iaId, userToken, }) => {
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
    const sendMessage = (message, options) => {
        var _a, _b;
        setGenerating(true);
        eventSource.current = new EventSource(`${API_URL}/chat/${iaId}?message=${encodeURIComponent(message)}&files=${((_a = ((options === null || options === void 0 ? void 0 : options.files) || [])) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? ((options === null || options === void 0 ? void 0 : options.files) || []).map((e) => e.uploadId).join(",")
            : ""}&chatId=${options.chatId}${userToken ? `&token=${userToken}` : ""}&advancedCrawling=${options.advancedCrawling ? "true" : "false"}${((_b = ((options === null || options === void 0 ? void 0 : options.searchZone) || [])) === null || _b === void 0 ? void 0 : _b.length) > 0
            ? `&searchZone=${((options === null || options === void 0 ? void 0 : options.searchZone) || []).map((e) => e.value).join(",")}`
            : ""}`);
        eventSource.current.onmessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
            var _c, _d;
            if ((_c = event.data) === null || _c === void 0 ? void 0 : _c.startsWith("[JSON]")) {
                setGenerating(false);
                const json = JSON.parse(event.data.replace("[JSON]", ""));
                if (json) {
                    options.onFinish && (yield options.onFinish(json));
                }
                return;
            }
            options.onMessage &&
                (yield options.onMessage((_d = event.data) === null || _d === void 0 ? void 0 : _d.replace(/\\n/g, "\n")));
        });
        eventSource.current.onerror = (error) => {
            console.error("EventSource failed:", error);
            setGenerating(false);
            options.onError && options.onError(error);
            if (eventSource.current) {
                eventSource.current.close();
            }
        };
    };
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
