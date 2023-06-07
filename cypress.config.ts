/**
 * Copyright 2023 Design Barn Inc.
 */

import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
