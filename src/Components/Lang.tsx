"use client";

import React from "react";
import styles from "../styles/lang.module.css";
import { EnumLangChat, TLang } from "../types";
import * as flags from "country-flag-icons/string/3x2";

interface IProps {
  value: TLang;
  onChange: (value: TLang) => void;
}

const Lang: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <div className={styles["lang-selector"]}>
      {Object.values(EnumLangChat)
        .sort((a, b) => (a === value ? -1 : b === value ? 1 : 0))
        .map((l) => (
          <div
            key={l}
            onClick={() => onChange(l)}
            style={{
              opacity: l === value ? 1 : 0.5,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: flags[l as keyof typeof flags],
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default Lang;
