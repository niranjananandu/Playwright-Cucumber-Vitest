import { chromium } from "@playwright/test";
import { getEnv } from "./env";
import fs from "fs";

async function main() {
  getEnv();

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // TODO: replace with your real login steps
  await page.goto(`${process.env.BASE_URL}`);
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.USERNAME ?? "");
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD ?? "");
  await page.locator('span').filter({ hasText: 'Login' }).last().click();

  // Wait for something that proves login succeeded
  await page.waitForURL(`${process.env.BASE_URL}`);

  // Ensure folder exists
  fs.mkdirSync("auth", { recursive: true });

  await context.storageState({ path: "auth/storageState.json" });

  await browser.close();
  console.log("✅ Saved storage state to storage/auth.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
