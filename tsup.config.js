/**
 * Copyright 2022 Design Barn Inc.
 */

import { defineConfig } from 'tsup';

export default defineConfig([
  {
    bundle: true,
    clean: true,
    dts: true,
    module: 'ESNext',
    format: ['esm', 'umd'],
    // For umd build
    globalName: 'LottiePlayer',
    metafile: false,
    minify: true,
    sourcemap: true,
    splitting: false,
    tsconfig: 'tsconfig.json',
    treeshake: true,
    entry: ['./src/lottie-player.ts'],
    outDir: './dist/',
    noExternal: ['lit', 'lottie-web'],
    platform: 'browser',
    target: ['ESNext'],
  },
]);
