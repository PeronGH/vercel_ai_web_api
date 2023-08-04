import { generate } from "./core.ts";
import { ChatConfig, ChatGPTConfig, LLaMaChatConfig } from "./types.ts";
import { withDefaults } from "./utils.ts";

type GeneralConfigOf<C extends ChatConfig> = Omit<
  C,
  "messages" | "model"
>;

export type LLaMaChatGeneralConfig = GeneralConfigOf<LLaMaChatConfig>;

export function makeLLaMaChatGenerator(
  config: Partial<LLaMaChatGeneralConfig> = {},
) {
  const configWithDefaults: LLaMaChatGeneralConfig = {
    maxTokens: 500,
    temperature: 0.75,
    topP: 1,
    repetitionPenalty: 0.2,
    ...config,
  };

  return withDefaults<
    LLaMaChatConfig,
    LLaMaChatGeneralConfig,
    AsyncGenerator<string>
  >(generate, configWithDefaults);
}

export type ChatGPTGeneralConfig = GeneralConfigOf<ChatGPTConfig>;

export function makeChatGPTGenerator(
  config: Partial<ChatGPTGeneralConfig> = {},
) {
  const configWithDefaults: ChatGPTGeneralConfig = {
    maxTokens: 500,
    temperature: 0.75,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    topK: 1,
    stopSequences: [],
    ...config,
  };

  return withDefaults<
    ChatGPTConfig,
    ChatGPTGeneralConfig,
    AsyncGenerator<string>
  >(generate, configWithDefaults);
}
