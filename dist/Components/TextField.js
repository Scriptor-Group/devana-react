"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_module_css_1 = __importDefault(require("./TextField.module.css"));
const MuiTextField = ({ value, onChange, onSubmit, buttonBackgroundColor, buttonTextColor, intls, }) => {
    return (react_1.default.createElement("form", { onSubmit: (e) => {
            e.preventDefault();
            onSubmit();
        }, className: TextField_module_css_1.default.container },
        react_1.default.createElement("div", { style: { flexGrow: 1 } },
            react_1.default.createElement("input", { type: "text", id: "name", placeholder: (intls === null || intls === void 0 ? void 0 : intls.placeholder) || "Entrez votre question", value: value, onChange: (e) => onChange(e.target.value), className: TextField_module_css_1.default.input, maxLength: 500, multiple: true, required: true, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off", spellCheck: "false" })),
        react_1.default.createElement("button", { type: "submit", className: TextField_module_css_1.default.button, style: {
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
            } }, (intls === null || intls === void 0 ? void 0 : intls.send) || "Envoyer")));
};
exports.default = MuiTextField;
