import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { BrowserContext, Page } from "@playwright/test";
import { Logger } from "winston";
import { PageManager } from "../test/pages/pageManager";

export class CustomWorld extends World {
  context?: BrowserContext;
  page?: Page;
  logger?: Logger;
  logFilePath?: string;
  pageManager?: PageManager;
}

setWorldConstructor(CustomWorld);
