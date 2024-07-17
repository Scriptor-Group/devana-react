import React from "react";
import styles from "../styles/pending.module.css";
import cl from "classnames";

interface IProps {
  classes?: {
    typing?: string;
  };
  theme?: "dark" | "light";
}

const Pending: React.FC<IProps> = ({ classes, theme }) => {
  return (
    <div
      className={cl(styles["typing"], classes?.typing, {
        [styles["dark"] as string]: theme === "dark",
      })}
    >
      <div className={styles["dot"]} />
      <div className={styles["dot"]} />
      <div className={styles["dot"]} />
    </div>
  );
};

export default Pending;
