"use client";

import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import { IMessage, ITheme, TFiabilityMessage, TFontFamily } from "../types";
import { hexToTransparentHex } from "../commons";
import styles from "../styles/message.module.css";
import Fiability from "./Fiability";
import cl from "classnames";

interface IProps {
  message?: IMessage;
  assistantBackgroundColor?: string;
  assistantTextColor?: string;
  userBackgroundColor?: string;
  userTextColor?: string;
  displayActions?: boolean;
  handleFiabilityMessage: (
    message: IMessage,
    fiability: TFiabilityMessage,
  ) => void;
  classes?: {
    messageUser?: string;
    messageAssistant?: string;
    actionsContainer?: string;
    btnContainerFiability?: string;
    thumpDownIcon?: string;
    thumpUpIcon?: string;
  };
  theme?: ITheme;
  fontFamilyMarkdown?: TFontFamily;
}

const Message: React.FC<IProps> = ({
  message,
  assistantBackgroundColor,
  assistantTextColor,
  displayActions,
  userBackgroundColor,
  userTextColor,
  handleFiabilityMessage,
  classes,
  theme,
  fontFamilyMarkdown,
}) => {
  return (
    <div
      key={`message_${message?.id}`}
      className={cl(
        styles[`message-${message?.message.role}`],
        {
          [classes?.messageUser || ""]: message?.message.role === "user",
          [classes?.messageAssistant || ""]:
            message?.message.role === "assistant",
        },
        {
          [styles["dark"] as string]: theme === "dark",
        },
      )}
      style={
        message?.message.role === "assistant"
          ? {
              backgroundColor: hexToTransparentHex(
                assistantBackgroundColor || "#ffffff",
                0.8,
              ),
              color: assistantTextColor,
              display: "flex",
              flexDirection: "column",
            }
          : {
              backgroundColor: hexToTransparentHex(
                userBackgroundColor || "#ffffff",
                0.8,
              ),
              color: userTextColor,
            }
      }
    >
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

      {displayActions && message?.message.role === "assistant" && (
        <Fiability
          message={message}
          fiability={message?.fiability || "DEFAULT"}
          handleFiabilityMessage={handleFiabilityMessage}
          classes={{
            actionsContainer: classes?.actionsContainer,
            btnContainerFiability: classes?.btnContainerFiability,
            thumpDownIcon: classes?.thumpDownIcon,
            thumpUpIcon: classes?.thumpUpIcon,
          }}
        />
      )}
    </div>
  );
};

export default Message;
