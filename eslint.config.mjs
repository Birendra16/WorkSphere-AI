import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "apps/**", // Each app lints itself with its own config
    ],
  },
  {
    rules: {
      "no-console": "warn",
      "no-debugger": "error",
    },
  },
];
