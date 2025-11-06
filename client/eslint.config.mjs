import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/.next',
    '**/.next/**',
    '**/out',
    '**/build',
    '**/.cache',
    '**/dist',
    '**/node_modules',
    'app/types/supabase.ts',
    'scripts/generate-about-image-script',
    'scripts/generate-project-image-script',
  ]),
  {
    extends: compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'next',
      'prettier'
    ),

    plugins: {
      'unused-imports': unusedImports,
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      'no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/order': 'off',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      'no-unsafe-optional-chaining': 1,

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
    },
  },
]);
