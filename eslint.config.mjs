import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Ignore patterns
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/dist/**",
      "**/build/**",
      "*.config.{js,mjs,cjs}",
      "**/*.d.ts",
    ],
  },

  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript ESLint configuration
  ...tseslint.configs.recommended,

  // Next.js core web vitals configuration
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScript rules - warnings only
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/consistent-type-imports": "warn",

      // Allow empty interfaces (needed for some patterns)
      "@typescript-eslint/no-empty-object-type": "off",

      // Allow console statements (for debugging)
      "no-console": "off",

      // Allow unused expressions (for conditional types)
      "@typescript-eslint/no-unused-expressions": "off",

      // Allow unnecessary escape characters
      "no-useless-escape": "off",

      // General rules
      "prefer-const": "warn",
      "no-extra-boolean-cast": "off",
    },
  },
];
