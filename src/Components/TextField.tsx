import React from "react";
import styles from "./TextField.module.css";
import { IIntls, ITheme } from "../types";
import ResetChatIcon from "../assets/reset-chat";
import classNames from "classnames";

const MuiTextField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  intls?: IIntls;
  showResetButton?: boolean;
  theme?: ITheme;
}> = ({
  value,
  onChange,
  onSubmit,
  onReset,
  buttonBackgroundColor,
  buttonTextColor,
  intls,
  showResetButton,
  theme,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={classNames(styles.container, {
        [styles.dark as string]: theme === "dark",
      })}
    >
      {showResetButton && (
        <div>
          <ResetChatIcon onClick={onReset} />
        </div>
      )}
      <div style={{ flexGrow: 1 }}>
        <input
          type="text"
          id="name"
          placeholder={intls?.placeholder || "Entrez votre question"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          maxLength={500}
          multiple
          required
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
      <button
        type="submit"
        className={styles.button}
        style={{
          backgroundColor: buttonBackgroundColor,
          color: buttonTextColor,
        }}
      >
        {intls?.send || "Envoyer"}
      </button>
    </form>
  );
};

export default MuiTextField;
