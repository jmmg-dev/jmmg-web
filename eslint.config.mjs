import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  // Next.js rules: Core Web Vitals (images, links, scripts, hooks) and TypeScript
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Unused code is a warning, and a leading underscore marks it as intentional
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
    "design/**",
    ".claude/**",
  ]),
  // Last: turns off the rules that Prettier takes care of
  prettier,
]);
