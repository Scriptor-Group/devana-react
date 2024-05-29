"use strict";
const jsxRuntime = require("react/jsx-runtime");
const TextField_module = require("./TextField.module.css.cjs");
const resetChat = require("../assets/reset-chat.cjs");
const MuiTextField = ({
  value,
  onChange,
  onSubmit,
  onReset,
  buttonBackgroundColor,
  buttonTextColor,
  intls,
  showResetButton
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit();
      },
      className: TextField_module.default.container,
      children: [
        showResetButton && /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(resetChat, { onClick: onReset }) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { flexGrow: 1 }, children: /* @__PURE__ */ jsxRuntime.jsx(
          "input",
          {
            type: "text",
            id: "name",
            placeholder: intls?.placeholder || "Entrez votre question",
            value,
            onChange: (e) => onChange(e.target.value),
            className: TextField_module.default.input,
            maxLength: 500,
            multiple: true,
            required: true,
            autoComplete: "off",
            autoCorrect: "off",
            autoCapitalize: "off",
            spellCheck: "false"
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "submit",
            className: TextField_module.default.button,
            style: {
              backgroundColor: buttonBackgroundColor,
              color: buttonTextColor
            },
            children: intls?.send || "Envoyer"
          }
        )
      ]
    }
  );
};
module.exports = MuiTextField;
