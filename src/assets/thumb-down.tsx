import React from "react";
import css from "./thumb-down.module.css";
import cl from "classnames";

const ThumbDownIcon: React.FC<{
  onClick?: () => void;
  active?: boolean;
}> = ({ onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={cl(css["button-thumb-down-icon"], {
        [css["button-thumb-down-icon-active"] as string]: active,
      })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="thumb-down-icon"
        viewBox="0 -960 960 960"
      >
        <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
      </svg>
    </div>
  );
};

export default ThumbDownIcon;
