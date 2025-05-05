import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist/**', '**/*.config.js'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      "react/jsx-key": "error",
      "no-console": "warn",
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];