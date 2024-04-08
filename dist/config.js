"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARKDOWN_PROPS = exports.API_VERSION = exports.API_URL = void 0;
/**
 * The URL for the API (default: https://api.devana.ai/).
 */
exports.API_URL = `https://api.devana.ai/`;
/**
 * The version of the API (default: v1).
 */
exports.API_VERSION = `v1`;
/**
 * Configuration object for Markdown preview.
 */
exports.MARKDOWN_PROPS = {
    /**
     * The style object for the Markdown preview.
     */
    style: {
        backgroundColor: "transparent",
        borderRadius: "4px",
        overflow: "auto",
    },
    /**
     * The wrapper element for the Markdown preview.
     */
    wrapperElement: {
        "data-color-mode": "light",
    },
    /**
     * Whether to skip HTML rendering in the Markdown preview.
     */
    skipHtml: true,
};
