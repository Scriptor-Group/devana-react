"use client";

import React from "react";
import { IMessage, EnumFiabilityMessage, TFiabilityMessage } from "../types";
import ThumbDownIcon from "../assets/thumb-down";
import ThumbUpIcon from "../assets/thumb-up";
import styles from "../styles/fiability.module.css";

interface IProps {
  message: IMessage;
  fiability: TFiabilityMessage;
  handleFiabilityMessage: (
    message: IMessage,
    fiability: TFiabilityMessage,
  ) => void;
}

const Fiability: React.FC<IProps> = ({
  message,
  fiability,
  handleFiabilityMessage,
}) => {
  return (
    <div className={styles["actions-container"]}>
      {Object.values(EnumFiabilityMessage).map((fiability_key) => (
        <div
          onClick={() => {
            const send =
              fiability === fiability_key ? "DEFAULT" : fiability_key;

            handleFiabilityMessage(message, send);
          }}
          className={styles["btn-container-fiability"]}
        >
          {fiability_key === EnumFiabilityMessage.BAD ? (
            <ThumbDownIcon active={fiability === fiability_key} />
          ) : (
            <ThumbUpIcon active={fiability === fiability_key} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Fiability;
