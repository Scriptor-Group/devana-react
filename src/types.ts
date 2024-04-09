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
};

export type IIntls = {
  send: string;
  placeholder: string;
};
