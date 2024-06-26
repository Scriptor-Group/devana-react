/**
 * Sets the token cookie in the browser.
 * @param token - The token to be set as a cookie.
 */
export const setTokenCookie = (token: string) => {
  if (typeof window === "undefined") return;
  // Set token cookie for 6 hours
  const d = new Date();
  d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `devana_public_token=${token};${expires};path=/`;
};

/**
 * Retrieves the value of the "devana_public_token" cookie.
 * @returns The value of the "devana_public_token" cookie, or an empty string if the cookie is not found.
 */
export const getTokenCookie = () => {
  if (typeof window === "undefined") return;
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

/**
 * Generate a random string of a given length.
 * @param length - The length of the string to generate.
 */
export const randomString = (length: number = 10): string => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

/**
 * HEX color to transparent HEX color.
 * @param hex - The HEX color to convert to a transparent HEX color.
 * @param opacity - The opacity of the transparent color.
 */
export const hexToTransparentHex = (hex: string, opacity: number): string => {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    return `rgba(0, 0, 0, ${opacity})`;
  }
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
