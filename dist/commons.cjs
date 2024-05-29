"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const setTokenCookie = (token) => {
  if (typeof window === "undefined")
    return;
  const d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + 6 * 60 * 60 * 1e3);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `devana_public_token=${token};${expires};path=/`;
};
const getTokenCookie = () => {
  if (typeof window === "undefined")
    return;
  const name = "devana_public_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i] || "";
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
const hexToTransparentHex = (hex, opacity) => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    return `rgba(0, 0, 0, ${opacity})`;
  }
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
exports.getTokenCookie = getTokenCookie;
exports.hexToTransparentHex = hexToTransparentHex;
exports.setTokenCookie = setTokenCookie;
