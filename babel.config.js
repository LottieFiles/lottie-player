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
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
    ],
  };
};
