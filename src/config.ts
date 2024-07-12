import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";

/**
 * The URL for the API (default: https://api.devana.ai/).
//  */
// export const API_URL = `https://api.devana.ai/`;
export const API_URL = `http://localhost:4666/`;

/**
 * The version of the API (default: v1).
 */
export const API_VERSION = `v1`;

/**
 * Configuration object for Markdown preview.
 */
export const MARKDOWN_PROPS: MarkdownPreviewProps = {
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
