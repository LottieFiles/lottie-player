/**
 * Copyright 2023 Design Barn Inc.
 */

module.exports = {
  root: true,

  plugins: ['@lottiefiles'],

  extends: [
    'plugin:@lottiefiles/esnext',
    'plugin:@lottiefiles/typescript',
    'plugin:@lottiefiles/typescript-typechecking',
    'plugin:@lottiefiles/nodejs',
    'plugin:@lottiefiles/prettier',
  ],

  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.cts', '*.mts'],

      parserOptions: {
        project: ['./packages/*/tsconfig.json', './tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaversion: 2022,
      },
    },

    // Allow code in bin and scripts folders to do CLI things
    {
      files: ['**/@(bin|scripts|examples)/**/*.@(js|ts|cjs|mjs|cts|mts)'],
      rules: {
        'no-console': 'off',
        'node/shebang': 'off',
      },
    },
  ],

  rules: {
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/prefer-for-of': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'no-case-declarations': 'off',

    // Disable project specific
    'func-style': 'off',

    // Disable the async generator warning
    'no-restricted-syntax': 'off',

    // Disable deprecation testing
    'deprecation/deprecation': 'off',

    'no-undefined': 'off',
    'import/extensions': 'off',
    'no-invalid-this': 'off',
  },
};
