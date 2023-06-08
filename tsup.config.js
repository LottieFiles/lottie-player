/**
 * Copyright 2022 Design Barn Inc.
 */

import { defineConfig } from 'tsup';

const commonOptions = {
  bundle: true,
  clean: true,
  dts: true,
  module: 'ESNext',
  format: ['esm', 'umd'],
  metafile: false,
  minify: true,
  sourcemap: true,
  splitting: false,
  tsconfig: 'tsconfig.json',
  treeshake: true,
  outDir: './dist/',
  platform: 'browser',
  target: ['ESNext'],
};

const lottiePlayerOptions = {
  ...commonOptions,
  // For umd build
  globalName: 'LottiePlayer',
  entry: ['./src/lottie-player.ts'],
  noExternal: ['lit', 'lottie-web'],
};

const tgsPlayerOptions = {
  ...commonOptions,
  // For umd build
  globalName: 'TgsPlayer',
  entry: ['./src/tgs-player.ts'],
  noExternal: ['lit', 'lottie-web', 'pako'],
};

export default defineConfig([lottiePlayerOptions, tgsPlayerOptions]);
