"use client";

import React from "react";
import styles from "../styles/lang.module.css";
import { EnumLangChat, ITheme, TLang, ThemeOverrides } from "../types";
import * as flags from "country-flag-icons/string/3x2";
import cl from "classnames";

interface IProps {
  value: TLang;
  onChange: (value: TLang) => void;
  theme: ITheme;
  themeOverrides?: ThemeOverrides;
}

const Lang: React.FC<IProps> = ({ value, onChange, theme, themeOverrides }) => {
  return (
    <div
      className={cl(styles["lang-selector"], {
        [styles["dark"] as string]: theme === "dark",
      })}
      style={themeOverrides as React.CSSProperties}
    >
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
              className={styles["flag"]}
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
