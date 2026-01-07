import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import { invokeBrowser } from "../helper/browserManager";
import { getEnv } from "../helper/env";
import { CustomWorld } from "../support/world";
import { buildScenarioLogger } from "../helper/logger";
import fs from "fs";

let browser: Browser;

BeforeAll(async function () {
    console.log("Starting Test Execution");
    getEnv();
    browser = await invokeBrowser();


});

Before(async function (this: CustomWorld, scenario) {
    console.log("Executing Before Hook");
    const { logger, logFilePath } = buildScenarioLogger(scenario.pickle.name);
    this.logger = logger;
    this.logFilePath = logFilePath;
    this.logger.info(`Logger initialized for scenario: ${scenario.pickle.name}`);
    this.context = await browser.newContext({
        recordVideo: { dir: 'reports/videos/' }
    });
    this.page = await this.context.newPage();

});

After(async function (this: CustomWorld, scenario) {
    console.log("Test Execution Completed");
    const status = scenario.result?.status ?? "UNKNOWN";
    this.logger?.info("Scenario finished", { status });

    let videoPath: string = "";
    let screenshot: Buffer | undefined;
    if (status === "FAILED") {
        screenshot = await this.page!.screenshot({ fullPage: true });
        videoPath = await this.page?.video()?.path() || "";
    }
    // Attach log file content to Cucumber report (super useful)
    if (this.logFilePath && fs.existsSync(this.logFilePath)) {
        const logText = fs.readFileSync(this.logFilePath, "utf-8");
    }

    await this.page?.close();
    await this.context?.close();
    if (status === "FAILED") {
        if (screenshot) {
            await this.attach(screenshot, { mediaType: "image/png", fileName: "failure.png" });
        }
        if (videoPath) {
            await this.attach(fs.readFileSync(videoPath), { mediaType: "video/webm", fileName: "failure-video.webm" });
        }
    }
});

AfterAll(async function () {
    console.log("Test Execution Finished");
    await browser?.close();

});

