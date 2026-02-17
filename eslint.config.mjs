export default [
  {
    ignores: ['dist', 'node_modules', '.astro', 'eslint.config.mjs']
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        fetch: 'readonly',
        JSON: 'readonly',
        document: 'readonly',
        window: 'readonly',
        HTMLElement: 'readonly',
        HTMLFormElement: 'readonly',
        FormData: 'readonly',
        encodeURIComponent: 'readonly',
        Intl: 'readonly',
        parseInt: 'readonly',
        encodeURIComponent: 'readonly',
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    }
  }
];
