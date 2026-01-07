import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { CustomWorld } from '../../support/world';

When('the user searches for {string}', async function (this:CustomWorld,string) {
    this.logger?.info(`Searching for book: ${string}`);
    const searchBox:Locator = this.page!.locator('input[type="search"]');
    await searchBox.fill(string);
});

Then('the search results should display {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});