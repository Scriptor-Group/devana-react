"use client";

import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { MARKDOWN_PROPS } from "../config";
import { IMessage, TFiabilityMessage } from "../types";
import { hexToTransparentHex } from "../commons";
import styles from "../styles/message.module.css";
import Fiability from "./Fiability";

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
}

const Message: React.FC<IProps> = ({
  message,
  assistantBackgroundColor,
  assistantTextColor,
  displayActions,
  userBackgroundColor,
  userTextColor,
  handleFiabilityMessage,
}) => {
  return (
    <div
      key={`message_${message?.id}`}
      className={styles[`message-${message?.message.role}`]}
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
          },
        }}
        source={message?.message.content}
      />

      {displayActions && message?.message.role === "assistant" && (
        <Fiability
          message={message}
          fiability={message?.fiability || "DEFAULT"}
          handleFiabilityMessage={handleFiabilityMessage}
        />
      )}
    </div>
  );
};

export default Message;
