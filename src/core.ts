import { getCustomEncoding } from "./custom_encoding.ts";
import { BASE_URL } from "./constants.ts";
import { ChatConfig } from "./types.ts";

export async function* generate<C extends ChatConfig>(
  config: C,
  signal?: AbortSignal,
) {
  const payload = {
    chatIndex: 0,
    playgroundId: crypto.randomUUID(),
    ...config,
  };

  const response = await fetch(`${BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Custom-Encoding": await getCustomEncoding(),
      "User-Agent": `Mozilla/5.0 ${Math.random()}`,
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText}: ${await response.text()}`,
    );
  }

  yield* response.body!.pipeThrough(new TextDecoderStream());
}
