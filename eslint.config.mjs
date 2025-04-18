import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  // 設定項目1: lint対象ファイルの設定
  // fileのみ, ignoresのみの設定項目を作ることで、指定した内容が他の項目にも引き継がれる
  {
    files: ["**/*.{js,ts,mjs,mts,cjs,cts,jsx,tsx}"],
    // 例: distディレクトリはlint対象から外す
    ignores: ["**/dist/**"],
  },

  // 設定項目2: eslintの推奨ルールを使用する
  // 従来設定における"eslint:recommended"に相当。
  // import js from "@eslint/js"; した上で以下のように書く。
  { 
    plugins: { js },
    extends: ["js/recommended"]
  },

  // 設定項目3: グローバル変数の設定
  // ここでは例としてNode.jsのグローバル変数を使用する。
  // import globals from "globals"; が必要。
  { 
    languageOptions: {
      globals: globals.browser
    }
  },
  // 設定項目4: TypeScriptパーサーの設定
  // 例: @typescript-eslint/parserを使用してTypeScriptのパースを行うよう設定する
  {
    files: ["**/*.{ts,mts,jsx,tsx}"],
    ...tseslint.configs.strictTypeChecked[0],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },
    rules: {
      // ルールの有効化/無効化を個別に設定することもできる
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      // ルールの有効化/無効化を個別に設定することもできる
      // "@typescript-eslint/no-misused-promises": "off",
      // "@typescript-eslint/no-floating-promises": "off",
    }
  },
  prettierConfig
]);