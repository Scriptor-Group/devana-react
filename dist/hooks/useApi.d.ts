import { IMessage } from "../types";
export interface IOptions {
    token?: string;
}
/**
 * Custom hook for interacting with an API.
 * @param publicKey - The public key used for authentication.
 * @param options - Optional configuration options.
 * @returns An object containing the token, createToken function, and getConversationHistory function.
 */
export declare const useApi: (publicKey: string, options?: IOptions) => {
    token: string | null;
    createToken: () => Promise<string | null>;
    getConversationHistory: () => Promise<IMessage[]>;
};
