import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";
import vueEslintParser from "vue-eslint-parser";

export default ts.config(
  // general defaults
  {
    ignores: ["dist/", "build/"],
  },
  // js defaults
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // we want to force double quotes
      "quotes": ["error", "double"],
      // we want to force semicolons
      "semi": ["error", "always"],
      // we use 2 spaces to indent our code
      "indent": ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
      // we want to leave unused vars in the code
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // typescript defaults
  ...ts.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: ts.parser,
    },
    rules: {
      // we want to force double quotes
      "quotes": ["error", "double"],
      // we want to force semicolons
      "semi": ["error", "always"],
      // we use 2 spaces to indent our code
      "indent": ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
      // we want to leave unused vars in the code
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // vue defaults
  ...eslintPluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: ts.parser,
      },
    },
    rules: {
      // we want to force double quotes
      "quotes": ["error", "double"],
      // we want to force semicolons
      "semi": ["error", "always"],
      // we use 2 spaces to indent our code
      "indent": ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
      // we want to leave unused vars in the code
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
