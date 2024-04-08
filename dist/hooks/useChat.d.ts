/**
 * Custom hook for handling chat functionality.
 * @param {Object} options - The options object.
 * @param {string | null} options.userToken - The user token.
 * @returns {Object} - An object containing the sendMessage function, generating state, and handleStop function.
 */
export declare const useChat: ({ userToken }: {
    userToken?: string | null;
}) => {
    sendMessage: (message: string, options: {
        onMessage?: (message: string) => void;
        onFinish?: (data: {
            text: string;
        }) => void;
        onError?: (error: string) => void;
    }) => Promise<void>;
    generating: boolean;
    handleStop: () => void;
};
