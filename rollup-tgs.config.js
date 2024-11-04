/**
 * Copyright 2022 Design Barn Inc.
 */

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import filesize from "rollup-plugin-filesize";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";

const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".jsx", ".ts", ".tsx", ".mjs"];
const outputDir = "./dist/";

export default {
  input: "./src/tgs-player.ts",
  treeshake: !!production,
  output: [
    {
      file: "./dist/tgs-player.esm.js",
      // dir: outputDir,
      format: "es",
      sourcemap: true,
    },
    {
      file: "./dist/tgs-player.js",
      format: "umd",
      name: "lottie-player",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    typescript2({
      check: false,
    }),
    babel({
      extensions,
      exclude: ["./node_modules/@babel/**/*", "./node_modules/core-js/**/*"],
    }),
    !production &&
    copy({
      targets: [
        { src: "./src/index.html", dest: outputDir },
        { src: "./src/sticker.tgs", dest: outputDir },
        {
          src: "./node_modules/@webcomponents/webcomponentsjs/bundles/",
          dest: outputDir,
        },
        {
          src: "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
          dest: outputDir,
        },
      ],
    }),
    filesize(),
    !production &&
    serve({
      contentBase: [outputDir],
      open: true,
      host: "localhost",
      port: 10001,
    }),

    production && terser(),
    json(),
  ],
};
