/**
 * Copyright 2022 Design Barn Inc.
 */

module.exports = {
  plugins: ['@lottiefiles', 'only-warn'],

  extends: [
    //   "plugin:@lottiefiles/nodejs",
    'plugin:@lottiefiles/typescript',
    'plugin:@lottiefiles/typescript-typechecking',
    'plugin:@lottiefiles/prettier',
  ],

  globals: {
    cep: true,
  },

  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    ecmaVersion: 2017,
  },

  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  ignorePatterns: ['node_modules', 'dist', 'packages'],
};
