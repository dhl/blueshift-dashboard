import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import typescript from "@shikijs/langs-precompiled/typescript";
import rust from "@shikijs/langs-precompiled/rust";
import toml from "@shikijs/langs-precompiled/toml";
import shellscript from "@shikijs/langs-precompiled/shellscript";
import json from "@shikijs/langs-precompiled/json";
import python from "@shikijs/langs-precompiled/python";
import type { ShikiTransformer } from "@shikijs/types";
import sbpfGrammar from "./sbpf-grammar.json" with { type: "json" };
import blueshiftTheme from "./blueshift-theme.json" with { type: "json" };

const bundledThemes = [
  {
    ...blueshiftTheme,
    type: "dark" as const,
  },
];

const sbpf = {
  name: "sbpf-asm",
  aliases: ["sbpf", "sbf", "ebpf"],
  ...sbpfGrammar,
};

const bundledLanguages = [
  typescript,
  rust,
  toml,
  shellscript,
  json,
  python,
  sbpf,
];

let highlighterPromise: ReturnType<typeof createHighlighterCore> | undefined;

export const getSingletonHighlighter = async() => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      engine: createJavaScriptRegexEngine({ target: "ES2024" }),
      langs: bundledLanguages,
      themes: bundledThemes,
    });
  }

  return highlighterPromise;
};
