import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { BrowserContext, Page } from "@playwright/test";
import { Logger } from "winston";

export class CustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  logger?: Logger;
  logFilePath?: string;
}

setWorldConstructor(CustomWorld);
