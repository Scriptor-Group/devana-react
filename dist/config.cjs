"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const API_URL = `https://api.devana.ai/`;
const API_VERSION = `v1`;
const MARKDOWN_PROPS = {
  /**
   * The style object for the Markdown preview.
   */
  style: {
    backgroundColor: "transparent",
    borderRadius: "4px",
    overflow: "auto"
  },
  /**
   * The wrapper element for the Markdown preview.
   */
  wrapperElement: {
    "data-color-mode": "light"
  },
  /**
   * Whether to skip HTML rendering in the Markdown preview.
   */
  skipHtml: true
};
exports.API_URL = API_URL;
exports.API_VERSION = API_VERSION;
exports.MARKDOWN_PROPS = MARKDOWN_PROPS;
