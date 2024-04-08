export { Conversation } from "./Components/Conversation";
declare const _default: {
    useChat: ({ userToken }: {
        userToken?: string | null | undefined;
    }) => {
        sendMessage: (message: string, options: {
            onMessage?: ((message: string) => void) | undefined;
            onFinish?: ((data: {
                text: string;
            }) => void) | undefined;
            onError?: ((error: string) => void) | undefined;
        }) => Promise<void>;
        generating: boolean;
        handleStop: () => void;
    };
    useApi: (publicKey: string, options?: import("./hooks/useApi").IOptions | undefined) => {
        token: string | null;
        createToken: () => Promise<string | null>;
        getConversationHistory: () => Promise<import("./types").IMessage[]>;
    };
};
export default _default;
