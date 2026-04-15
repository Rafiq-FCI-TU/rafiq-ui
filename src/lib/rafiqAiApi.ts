/** POST /ask — Rafiq AI backend */
const DEFAULT_ASK_URL =
  "https://rafiq-ai-app-gugrccaxbfhydvhr.germanywestcentral-01.azurewebsites.net/ask";

export function getRafiqAiAskUrl(): string {
  const fromEnv = import.meta.env.VITE_RAFIQ_AI_ASK_URL;
  if (typeof fromEnv === "string" && fromEnv.trim()) {
    return fromEnv.trim();
  }
  // Vite dev server proxies /rafiq-ai-api → Azure (see vite.config.ts)
  if (import.meta.env.DEV) {
    return "/rafiq-ai-api/ask";
  }
  return DEFAULT_ASK_URL;
}

type AskApiResponse = {
  response?: string;
};


export function parseAskResponseBody(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  const jsonStart = trimmed.indexOf("{");
  if (jsonStart === -1) return trimmed;

  let depth = 0;
  let end = -1;
  for (let i = jsonStart; i < trimmed.length; i++) {
    const c = trimmed[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) return trimmed;

  try {
    const obj = JSON.parse(trimmed.slice(jsonStart, end + 1)) as {
      content?: string;
      source?: string;
    };
    if (typeof obj.content === "string") {
      let text = obj.content;
      if (typeof obj.source === "string" && obj.source.trim()) {
        text += `\n\nSource: ${obj.source.trim()}`;
      }
      return text;
    }
  } catch {
    // fall through
  }

  return trimmed;
}

export async function askRafiqAi(message: string): Promise<string> {
  const url = getRafiqAiAskUrl();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message.trim() }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(errBody || `Request failed (${res.status})`);
  }

  const data = (await res.json()) as AskApiResponse;
  if (typeof data.response !== "string") {
    throw new Error("Unexpected response from AI service.");
  }

  return parseAskResponseBody(data.response);
}
