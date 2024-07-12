type LLMMessage = {
  content: string;
  role: "user" | "assistant" | "system";
};

export type IMessage = {
  id: string;
  message: LLMMessage;
  created: number;
  conversation_id: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  message_id?: string;
  fiability?: TFiabilityMessage;
};

export type IIntls = {
  send: string;
  placeholder: string;
};

export type TEventName = "messageSent" | "messageReceived" | "onError";

export enum EnumFiabilityMessage {
  GOOD = "GOOD",
  BAD = "BAD",
}
export type TFiabilityMessage =
  | EnumFiabilityMessage.GOOD
  | EnumFiabilityMessage.BAD
  | "DEFAULT";

export enum EnumLangChat {
  fr = "FR",
  us = "US",
}

export type TLang = EnumLangChat.fr | EnumLangChat.us;
export type TLangKey = keyof typeof EnumLangChat;

export type ITheme = "light" | "dark";

export type TFontFamily =
  | "-moz-initial"
  | "inherit"
  | "initial"
  | "revert"
  | "revert-layer"
  | "unset"
  | "cursive"
  | "fantasy"
  | "monospace"
  | "sans-serif"
  | "serif"
  | (string & {});

export type ThemeOverrides = React.CSSProperties & {
  "--bg-color-light"?: string;
  "--bg-color-dark"?: string;
  "--box-shadow-color-light"?: string;
  "--box-shadow-color-dark"?: string;
  "--border-color-light"?: string;
  "--border-color-dark"?: string;
  "--text-color-light"?: string;
  "--bg-color-white"?: string;
};
