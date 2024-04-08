/**
 * Sets the token cookie in the browser.
 * @param token - The token to be set as a cookie.
 */
export declare const setTokenCookie: (token: string) => void;
/**
 * Retrieves the value of the "devana_public_token" cookie.
 * @returns The value of the "devana_public_token" cookie, or an empty string if the cookie is not found.
 */
export declare const getTokenCookie: () => string | undefined;
/**
 * Generate a random string of a given length.
 * @param length - The length of the string to generate.
 */
export declare const randomString: (length?: number) => string;
/**
 * HEX color to transparent HEX color.
 * @param hex - The HEX color to convert to a transparent HEX color.
 * @param opacity - The opacity of the transparent color.
 */
export declare const hexToTransparentHex: (hex: string, opacity: number) => string;
