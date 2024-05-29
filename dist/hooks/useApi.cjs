"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const React = require("react");
const config = require("../config.cjs");
const commons = require("../commons.cjs");
const useApi = (publicKey, options) => {
  const [token, setToken] = React.useState(
    options?.token || commons.getTokenCookie() || null
  );
  const createToken = async (force) => {
    if (!force && !publicKey)
      return null;
    const route = "/chat/conversation/public/message/token";
    const url = `${config.API_URL}${config.API_VERSION}${route}`;
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
      commons.setTokenCookie(_token);
      setToken(_token);
    }
    return _token;
  };
  const getConversationHistory = async () => {
    if (!token)
      return [];
    const route = `/chat/conversation/public/messages/:token`;
    const url = `${config.API_URL}${config.API_VERSION}${route.replace(":token", token || "")}`;
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
exports.useApi = useApi;
