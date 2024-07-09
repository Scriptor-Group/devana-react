import { useState } from "react";
import { API_URL, API_VERSION } from "../config";
import { IMessage } from "../types";
import { getTokenCookie, setTokenCookie } from "../commons";

export interface IOptions {
  token?: string;
}
/**
 * Custom hook for interacting with an API.
 * @param publicKey - The public key used for authentication.
 * @param options - Optional configuration options.
 * @returns An object containing the token, createToken function, and getConversationHistory function.
 */
export const useApi = (publicKey: string, options?: IOptions) => {
  const [token, setToken] = useState<string | null>(
    options?.token || getTokenCookie() || null,
  );

  /**
   * Creates a token by making a POST request to the API.
   * The token is retrieved from the response data and stored in the state.
   * If the token is successfully retrieved, it is also stored in a cookie.
   * @returns A Promise that resolves to the token string.
   */
  const createToken = async (force?: boolean): Promise<string | null> => {
    if (!force && !publicKey) return null;

    const route = "/chat/conversation/public/message/token";
    const url = `${API_URL}${API_VERSION}${route}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicKey}`,
      },
    });

    const data = await response.json();
    const _token = data?.token;

    if (_token) {
      setTokenCookie(_token);
      setToken(_token);
    }

    return _token;
  };

  /**
   * Retrieves the conversation history from the server.
   * @returns A promise that resolves to an array of messages.
   */
  const getConversationHistory = async (): Promise<IMessage[]> => {
    if (!token) return [];

    const route = `/chat/conversation/public/messages/:token`;
    const url = `${API_URL}${API_VERSION}${route.replace(":token", token || "")}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data?.messages || [];
  };

  return {
    token,
    createToken,
    getConversationHistory,
  };
};
