"use client";

import React from "react";
import styles from "../styles/typing-message.module.css";
import { IMessage, ITheme, TFontFamily } from "../types";
import { hexToTransparentHex } from "../commons";
import classNames from "classnames";
import { toolsIcons } from "../utils/tools";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import cl from "classnames";

interface IProps {
  message: IMessage;
  tools: string[];
  activeToolState: string | null;
  runnedTools: string[];
  assistantBackgroundColor?: string;
  displayTools?: boolean;
  assistantTextColor?: string;
  userTextColor?: string;
  classes?: {
    messageUser?: string;
    messageAssistant?: string;
  };
  fontFamilyMarkdown?: TFontFamily;
  theme?: ITheme;
}

const TypingMessage: React.FC<IProps> = ({
  message,
  displayTools,
  tools,
  activeToolState,
  runnedTools,
  assistantBackgroundColor,
  assistantTextColor,
  userTextColor,
  classes,
  fontFamilyMarkdown,
  theme,
}) => {
  return (
    <div
      key={`message_${message?.id}`}
      className={cl(
        styles[`message-${message?.message.role}`],
        {
          [styles["dark"] as string]: theme === "dark",
        },
        classes?.messageAssistant,
      )}
      style={{
        backgroundColor: hexToTransparentHex(
          assistantBackgroundColor || "#ffffff",
          0.8,
        ),
        color: assistantTextColor,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {runnedTools &&
        message?.message.content.trim().length === 0 &&
        displayTools && (
          <div className={styles["tool-container"]}>
            <div
              className={classNames(styles["tool-block"], {
                [styles["tool-working"] as string]: tools.length === 0,
              })}
            />

            {runnedTools.map((tool) => (
              <div
                className={classNames(styles["tool-block"], {
                  [styles["tool-working"] as string]: tool === activeToolState,
                })}
              >
                {toolsIcons(tool)}
              </div>
            ))}
          </div>
        )}
      <MarkdownPreview
        {...{
          ...MARKDOWN_PROPS,
          style: {
            ...MARKDOWN_PROPS.style,
            color:
              message?.message.role === "assistant"
                ? assistantTextColor
                : userTextColor,
            fontFamily: fontFamilyMarkdown,
          },
        }}
        source={message?.message.content}
      />
    </div>
  );
};

export default TypingMessage;
