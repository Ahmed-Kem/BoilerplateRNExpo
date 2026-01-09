// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,

  {
    ignores: ["dist/*", "node_modules/*", "ios/*", "android/*"],

    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
    },

    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },

    rules: {
      // Prettier
      "prettier/prettier": "warn",

      // React Native specific rules
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "import/prefer-default-export": "off",
    },
  },
]);
