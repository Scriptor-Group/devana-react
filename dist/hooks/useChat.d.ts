export declare const useChat: ({ iaId, userToken, }: {
    iaId: string;
    userToken?: string | undefined;
}) => {
    sendMessage: (message: string, options: {
        files?: any[] | undefined;
        chatId?: string | undefined;
        advancedCrawling?: boolean | undefined;
        searchZone?: any[] | undefined;
        onMessage: (message: string) => void;
        onFinish: (data: {
            text: string;
            chatId: string;
        }) => void;
        onError: (error: any) => void;
    }) => void;
    generating: boolean;
    handleStop: () => void;
};
