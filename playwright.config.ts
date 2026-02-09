import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests-e2e",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:5178",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --port 5178",
    url: "http://localhost:5178",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
});
