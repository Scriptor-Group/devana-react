"use client";

import React from "react";
import {
  IMessage,
  EnumFiabilityMessage,
  TFiabilityMessage,
  ThemeOverrides,
} from "../types";
import ThumbDownIcon from "../assets/thumb-down";
import ThumbUpIcon from "../assets/thumb-up";
import styles from "../styles/fiability.module.css";
import cl from "classnames";

interface IProps {
  message: IMessage;
  fiability: TFiabilityMessage;
  themeOverrides?: ThemeOverrides;
  handleFiabilityMessage: (
    message: IMessage,
    fiability: TFiabilityMessage,
  ) => void;
  classes?: {
    actionsContainer?: string;
    btnContainerFiability?: string;
    thumpDownIcon?: string;
    thumpUpIcon?: string;
  };
}

const Fiability: React.FC<IProps> = ({
  message,
  fiability,
  handleFiabilityMessage,
  classes,
  themeOverrides,
}) => {
  return (
    <div
      className={cl(styles["actions-container"], classes?.actionsContainer)}
      style={themeOverrides}
    >
      {Object.values(EnumFiabilityMessage).map((fiability_key) => (
        <div
          onClick={() => {
            const send =
              fiability === fiability_key ? "DEFAULT" : fiability_key;

            handleFiabilityMessage(message, send);
          }}
          className={cl(
            styles["btn-container-fiability"],
            classes?.btnContainerFiability,
          )}
        >
          {fiability_key === EnumFiabilityMessage.BAD ? (
            <ThumbDownIcon
              active={fiability === fiability_key}
              classes={{
                thumpDownIcon: classes?.thumpDownIcon,
              }}
            />
          ) : (
            <ThumbUpIcon
              active={fiability === fiability_key}
              classes={{
                thumpUpIcon: classes?.thumpUpIcon,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Fiability;
