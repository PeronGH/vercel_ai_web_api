import { BASE_URL } from "./constants.ts";

export async function getCustomEncoding() {
  const response = await fetch(`${BASE_URL}/openai.jpeg`),
    text = await response.text(),
    json = fromBinary(text),
    { c, a, t } = JSON.parse(json),
    r = eval(`(globalThis)=>${c}`)({
      ...globalThis,
      marker: "mark",
      Deno: undefined,
      process: undefined,
    })(a);
  return toBinary(JSON.stringify({ r, t }));
}

function fromBinary(t: string) {
  const a = atob(t),
    o = new Uint8Array(a.length);
  for (let t = 0; t < o.length; t++) {
    o[t] = a.charCodeAt(t);
  }
  return String.fromCharCode(...new Uint16Array(o.buffer));
}

function toBinary(t: string) {
  const a = new Uint16Array(t.length);
  for (let o = 0; o < a.length; o++) {
    a[o] = t.charCodeAt(o);
  }
  return btoa(String.fromCharCode(...new Uint8Array(a.buffer)));
}
