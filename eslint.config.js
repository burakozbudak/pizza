import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier/flat";
import cypressPlugin from "eslint-plugin-cypress";

export default [
  js.configs.recommended,
  {
    // Uygulama dosyaları için
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    ignores: ["cypress/**/*"], // Cypress dosyalarını burada ignore et
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        fetch: "readonly",
        document: "readonly",
        __dirname: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    // Cypress test dosyaları için özel yapılandırma
    files: ["cypress/**/*.js", "cypress/**/*.ts"],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        ...cypressPlugin.environments.globals.globals,
      },
    },
  },
  prettier,
];
