// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/*.config.mjs',
      'postcss.config.mjs',
    ],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...typescriptEslintPlugin.configs['recommended'].rules,
      ...typescriptEslintPlugin.configs['recommended-type-checked'].rules,
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-console': 'error',
      'no-plusplus': 'off',
      'no-restricted-syntax': 'off',
      'consistent-return': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'react/state-in-constructor': 'off',
      'react/static-property-placement': 'off',
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'jsx-a11y/anchor-is-valid': 'off',
      'react/require-default-props': 'off',
      'import/extensions': 'off',
      'react/display-name': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'no-param-reassign': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      // 'max-len': ['error', { code: 80, ignoreUrls: true }],
      'import/no-cycle': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];
