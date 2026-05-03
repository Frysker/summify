import { useCallback, useState } from "react";
import { callOpenRouter } from "../services/openrouter";
import { extractKeyTerms } from "../services/keyTermExtractor";

const EMPTY_VARIANTS = { concise: "", detailed: "", bullet: "" };

export function useSummarizer() {
  const [summary, setSummary] = useState("");
  const [summaryVariants, setSummaryVariants] = useState(EMPTY_VARIANTS);
  const [keyTerms, setKeyTerms] = useState({ nodes: [], edges: [] });
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState(null);

  const summarize = useCallback(async (text) => {
    if (!text?.trim()) return null;

    setSummarizing(true);
    setError(null);
    setSummary("");
    setSummaryVariants(EMPTY_VARIANTS);
    setKeyTerms({ nodes: [], edges: [] });

    try {
      const rawSummary = await callOpenRouter([
        {
          role: "system",
          content:
            "You are a professional summarizer. Return only valid JSON with this exact shape: " +
            '{"concise": string, "detailed": string, "bullet": string}. ' +
            'concise must be one short paragraph. detailed must be 3 paragraphs. ' +
            'bullet must be 3-6 bullet lines using "- " prefixes. Do not add markdown fences.',
        },
        {
          role: "user",
          content: `Summarize this document into all requested modes:\n\n${text}`,
        },
      ], "json");

      const variants = normalizeSummaryVariants(rawSummary);
      setSummaryVariants(variants);
      setSummary(variants.concise);

      const rawTerms = await callOpenRouter([
        {
          role: "system",
          content:
            "You are a key term extractor. Return ONLY a raw JSON object, no markdown, no backticks, no explanation. " +
            'Exact shape required: { "nodes": [{ "id": string, "label": string }], ' +
            '"edges": [{ "source": string, "target": string, "label": string }] }. ' +
            "Extract 6-12 key terms as nodes with meaningful relationships as edges.",
        },
        {
          role: "user",
          content: `Extract key terms and relationships from this summary:\n\n${variants.detailed || variants.concise}`,
        },
      ], "json");

      const terms = extractKeyTerms(rawTerms);
      setKeyTerms(terms);

      return {
        summary: variants.concise,
        summaryVariants: variants,
        keyTerms: terms,
      };
    } catch (err) {
      setError(err.message ?? "An error occurred during summarization.");
      return null;
    } finally {
      setSummarizing(false);
    }
  }, []);

  return { summary, summaryVariants, keyTerms, summarizing, error, summarize };
}

function normalizeSummaryVariants(raw) {
  const content = typeof raw === "string" ? raw.trim() : "";

  try {
    const parsed = JSON.parse(content);
    return {
      concise: sanitizeText(parsed.concise),
      detailed: sanitizeText(parsed.detailed),
      bullet: sanitizeText(parsed.bullet),
    };
  } catch {
    return {
      concise: content,
      detailed: content,
      bullet: content
        .split(/\n{2,}/)
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 6)
        .map((line) => `- ${line}`)
        .join("\n"),
    };
  }
}

function sanitizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}
