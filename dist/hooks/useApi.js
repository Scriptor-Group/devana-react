import { useState } from "react";
import { API_URL, API_VERSION } from "../config.js";
import { getTokenCookie, setTokenCookie } from "../commons.js";
const useApi = (publicKey, options) => {
  const [token, setToken] = useState(
    options?.token || getTokenCookie() || null
  );
  const createToken = async (force) => {
    if (!force && !publicKey)
      return null;
    const route = "/chat/conversation/public/message/token";
    const url = `${API_URL}${API_VERSION}${route}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicKey}`
      }
    });
    const data = await response.json();
    const _token = data?.token;
    if (_token) {
      setTokenCookie(_token);
      setToken(_token);
    }
    return _token;
  };
  const getConversationHistory = async () => {
    if (!token)
      return [];
    const route = `/chat/conversation/public/messages/:token`;
    const url = `${API_URL}${API_VERSION}${route.replace(":token", token || "")}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    return data?.messages || [];
  };
  return {
    token,
    createToken,
    getConversationHistory
  };
};
export {
  useApi
};
