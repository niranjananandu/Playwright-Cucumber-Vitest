import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected page:Page;

    constructor(page:Page) {
        this.page = page;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }   

  async waitForUrlContains(partial: string) {
    await this.page.waitForURL((url) => url.toString().includes(partial));
  }

  async isVisible(locator: Locator) {
    try{
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        return await locator.isVisible();
    }
    catch{
        return false;
    }
  }
}




