/**
 * Copyright 2022 Design Barn Inc.
 */

const { CODE_COVERAGE } = process.env;
const plugins = [
  ["@babel/plugin-proposal-decorators", { legacy: true }],
  ["@babel/plugin-proposal-class-properties", { loose: true }],
  ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
  ["@babel/plugin-proposal-private-methods", { loose: true }],
];

if (CODE_COVERAGE === "true") plugins.push("istanbul");

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: {
            edge: "17",
            firefox: "60",
            chrome: "67",
            safari: "11.1",
            esmodules: true,
          },
        },
      ],
    ],
    plugins,
  };
};
