const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL    = import.meta.env.VITE_OPENROUTER_MODEL ?? 'llama-3.3-70b-versatile';
const API_KEY  = import.meta.env.VITE_OPENROUTER_API_KEY;

/**
 * @param {Array<{role: string, content: string}>} messages
 * @param {'text' | 'json'} responseFormat
 * @returns {Promise<string>}
 */

export async function callOpenRouter(messages, responseFormat = 'text') {
  if (!API_KEY) throw new Error('Missing VITE_OPENROUTER_API_KEY in environment.');

  const resolvedMessages = responseFormat === 'json'
    ? enforceJsonInSystemPrompt(messages)
    : messages;

  const body = {
    model: MODEL,
    messages: resolvedMessages,
    max_tokens: 1024,
    temperature: 0.3,
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const status = res.status;

    if (status === 429) {
      throw new Error('Rate limit reached. Please wait a moment and try again.');
    }

    throw new Error(err?.error?.message ?? `API error ${status}`);
  }

  const data    = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from model.');
  return responseFormat === 'json' ? stripCodeFences(content) : content;
}

function enforceJsonInSystemPrompt(messages) {
  const JSON_SUFFIX =
    '\n\nCRITICAL: Respond with raw JSON only. ' +
    'No markdown fences, no backticks, no explanation, no preamble. ' +
    'Your entire response must be a single valid JSON object.';

  const hasSystem = messages.some((m) => m.role === 'system');

  if (hasSystem) {
    return messages.map((m) =>
      m.role === 'system' ? { ...m, content: m.content + JSON_SUFFIX } : m
    );
  }

  return [{ role: 'system', content: JSON_SUFFIX.trim() }, ...messages];
}

function stripCodeFences(text) {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
}