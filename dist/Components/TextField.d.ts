import React from "react";
import { IIntls } from "../types";
declare const MuiTextField: React.FC<{
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    intls?: IIntls;
}>;
export default MuiTextField;
