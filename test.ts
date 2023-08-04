import { assertEquals } from "https://deno.land/std@0.197.0/assert/assert_equals.ts";
import { makeChatGPTGenerator } from "./mod.ts";

Deno.test("vercel ai", async () => {
  const generate = makeChatGPTGenerator();

  const stream = generate({
    model: "openai:gpt-3.5-turbo",
    messages: [
      { role: "user", content: "Let's count from 1" },
      { role: "assistant", content: "1" },
      { role: "user", content: "2" },
    ],
  });

  const tokens = [];
  for await (const token of stream) {
    tokens.push(token);
  }

  assertEquals(tokens.join("").trim(), "3");
});
