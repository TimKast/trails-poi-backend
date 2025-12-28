import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    globalSetup: ["./src/tests/setup.ts"],
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8", // Coverage Provider
      reporter: ["text", "html"], // Text + HTML Report
      clean: true, // alte Reports löschen
    },
  },
});
