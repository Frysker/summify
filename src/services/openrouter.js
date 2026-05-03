const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL ?? 'meta-llama/llama-3.3-70b-instruct:free';
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

/**
 * @param {Array<{role: string, content: string}>} messages
 * @param {'text' | 'json'} responseFormat
 * @returns {Promise<string>}
 */
export async function callOpenRouter(messages, responseFormat = 'text') {
  if (!API_KEY) throw new Error('Missing VITE_OPENROUTER_API_KEY in environment.');

  const body = {
    model: MODEL,
    messages,
    max_tokens: 1024,
    temperature: 0.3,
    ...(responseFormat === 'json' && {
      response_format: { type: 'json_object' },
    }),
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      'HTTP-Referer': window.location.origin,   // Required by OpenRouter
      'X-Title': 'Summify',                     // Appears on OpenRouter leaderboard
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `OpenRouter error: ${res.status}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) throw new Error('Empty response from model.');
  return content;
}