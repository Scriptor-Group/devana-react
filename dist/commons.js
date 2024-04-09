/**
 * Sets the token cookie in the browser.
 * @param token - The token to be set as a cookie.
 */
export var setTokenCookie = function (token) {
    if (typeof window === "undefined")
        return;
    // Set token cookie for 6 hours
    var d = new Date();
    d.setTime(d.getTime() + 6 * 60 * 60 * 1000);
    var expires = "expires=".concat(d.toUTCString());
    document.cookie = "devana_public_token=".concat(token, ";").concat(expires, ";path=/");
};
/**
 * Retrieves the value of the "devana_public_token" cookie.
 * @returns The value of the "devana_public_token" cookie, or an empty string if the cookie is not found.
 */
export var getTokenCookie = function () {
    if (typeof window === "undefined")
        return;
    var name = "devana_public_token=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i] || "";
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
export var randomString = function (length) {
    if (length === void 0) { length = 10; }
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
/**
 * HEX color to transparent HEX color.
 * @param hex - The HEX color to convert to a transparent HEX color.
 * @param opacity - The opacity of the transparent color.
 */
export var hexToTransparentHex = function (hex, opacity) {
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        return "rgba(0, 0, 0, ".concat(opacity, ")");
    }
    var r = parseInt(hex.substring(1, 3), 16);
    var g = parseInt(hex.substring(3, 5), 16);
    var b = parseInt(hex.substring(5, 7), 16);
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(opacity, ")");
};
