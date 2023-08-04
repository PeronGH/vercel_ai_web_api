export type Message = {
  role: "user" | "assistant";
  content: string;
};

export interface BasicChatConfig {
  model: string;
  messages: Message[];
  maxTokens: number;
  temperature: number;
  topP: number;
}

export interface LLaMaChatConfig extends BasicChatConfig {
  model:
    | "replicate:replicate/llama-2-7b-chat"
    | "replicate:replicate/llama-2-13b-chat"
    | "replicate:replicate/llama-2-70b-chat";
  repetitionPenalty: number;
}

export interface ChatGPTConfig extends BasicChatConfig {
  model: "openai:gpt-3.5-turbo" | "openai:gpt-3.5-turbo-16k";
  frequencyPenalty: number;
  presencePenalty: number;
  stopSequences: string[];
  topK: number;
}

export type ChatConfig = LLaMaChatConfig | ChatGPTConfig;
