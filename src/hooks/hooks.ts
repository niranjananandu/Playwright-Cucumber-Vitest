import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import { invokeBrowser } from "../helper/browserManager";
import { getEnv } from "../helper/env";
import { CustomWorld } from "../support/world";
import { buildScenarioLogger } from "../helper/logger";
import fs from "fs";
import { PageManager } from "../test/pages/pageManager";

let browser: Browser;
const storagePath = 'auth/storageState.json';

BeforeAll(async function () {
    console.log("Starting Test Execution");
    getEnv();
    browser = await invokeBrowser();
});


Before({ tags: "not @auth" }, async function (this: CustomWorld, scenario) {
    console.log("Executing Before Hook without Stored state");
    const { logger, logFilePath } = buildScenarioLogger(scenario.pickle.name);
    this.logger = logger;
    this.logFilePath = logFilePath;
    this.logger.info(`Logger initialized for scenario: ${scenario.pickle.name}`);
    this.context = await browser.newContext({
        recordVideo: { dir: 'reports/videos/' }
    });
    await this.context.tracing.start({ name: scenario.pickle.name + scenario.pickle.id, title: scenario.pickle.name, screenshots: true, snapshots: true, sources: true });

    this.page = await this.context.newPage();
    this.pageManager = new PageManager(this.page);

});

Before({ tags: "@auth" }, async function (this: CustomWorld, scenario) {
    console.log("Executing Before Hook with stored state");
    const { logger, logFilePath } = buildScenarioLogger(scenario.pickle.name);
    this.logger = logger;
    this.logFilePath = logFilePath;
    this.logger.info(`Logger initialized for scenario: ${scenario.pickle.name}`);

    this.context = await browser.newContext({
        storageState: storagePath,
        recordVideo: { dir: 'reports/videos/' }
    });
    await this.context.tracing.start({ name: scenario.pickle.name + scenario.pickle.id, title: scenario.pickle.name, screenshots: true, snapshots: true, sources: true });

    this.page = await this.context.newPage();
    this.pageManager = new PageManager(this.page);

});

After(async function (this: CustomWorld, scenario) {
    const status = scenario.result?.status ?? "UNKNOWN";
    this.logger?.info("Scenario finished", { status });
    let videoPath: string = "";
    let screenshot: Buffer | undefined;
    if (status === "PASSED") {
        screenshot = await this.page!.screenshot({ fullPage: true });
        videoPath = await this.page?.video()?.path() || "";
    }
    const tracePath = `reports/traces/trace-${scenario.pickle.name.replace(/\s+/g, '_')}-${Date.now()}.zip`
    await this.context?.tracing.stop({ path: tracePath });
    // Attach log file content to Cucumber report (super useful)
    let logText = "";
    if (this.logFilePath && fs.existsSync(this.logFilePath)) {
        logText = fs.readFileSync(this.logFilePath, "utf-8");
    }

    await this.page?.close();
    await this.context?.close();

    if (status === "PASSED") {
        if (screenshot) {
            await this.attach(screenshot, { mediaType: "image/png" });
        }
        if (videoPath) {
            await this.attach(fs.readFileSync(videoPath), { mediaType: "video/webm" });
        }
        if (tracePath) {
            await this.attach(fs.readFileSync(tracePath), { mediaType: "application/zip" });
        }
        if (this.logFilePath && fs.existsSync(this.logFilePath)) {
            await this.attach(logText, { mediaType: "text/plain" });
        }
    }
});

AfterAll(async function () {
    console.log("Test Execution Finished");
    await browser?.close();

});

