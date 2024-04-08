import React from "react";
import styles from "./TextField.module.css";
import { IIntls } from "../types";

const MuiTextField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  intls?: IIntls;
}> = ({
  value,
  onChange,
  onSubmit,
  buttonBackgroundColor,
  buttonTextColor,
  intls,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={styles.container}
    >
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
