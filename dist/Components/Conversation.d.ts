import React from "react";
import { IIntls } from "../types";
interface IProps {
    publicKey: string;
    welcomeMessage?: string;
    assistantBackgroundColor?: string;
    assistantTextColor?: string;
    userBackgroundColor?: string;
    userTextColor?: string;
    chatBackgroundColor?: string;
    chatBackgroundSecondaryColor?: string;
    buttonBackgroundColor?: string;
    buttonTextColor?: string;
    intls?: IIntls;
}
export declare const Conversation: React.FC<IProps>;
export {};
