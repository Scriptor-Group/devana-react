import React from "react";
import styles from "./TextField.module.css";
var MuiTextField = function (_a) {
    var value = _a.value, onChange = _a.onChange, onSubmit = _a.onSubmit, buttonBackgroundColor = _a.buttonBackgroundColor, buttonTextColor = _a.buttonTextColor, intls = _a.intls;
    return (React.createElement("form", { onSubmit: function (e) {
            e.preventDefault();
            onSubmit();
        }, className: styles.container },
        React.createElement("div", { style: { flexGrow: 1 } },
            React.createElement("input", { type: "text", id: "name", placeholder: (intls === null || intls === void 0 ? void 0 : intls.placeholder) || "Entrez votre question", value: value, onChange: function (e) { return onChange(e.target.value); }, className: styles.input, maxLength: 500, multiple: true, required: true, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false" })),
        React.createElement("button", { type: "submit", className: styles.button, style: {
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
            } }, (intls === null || intls === void 0 ? void 0 : intls.send) || "Envoyer")));
};
export default MuiTextField;
