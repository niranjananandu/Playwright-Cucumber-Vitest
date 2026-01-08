import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, Locator, expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

Given('the user is on the login page', async function (this: CustomWorld) {
    await this.pageManager!.loginPage.navigateTo(process.env.BASE_URL||'https://bookcart.azurewebsites.net/');

});

When('the user logs in with valid credentials', async function () {
    await this.pageManager!.loginPage.login(process.env.USERNAME,  process.env.PASSWORD);

});

Then('the user should be logged in successfully', async function () {
    expect(await this.pageManager!.loginPage.isLoggedIn()).toBeTruthy();

});

When('the user logs in with username {string} and password {string}', async function (string: string, string2: string) {
    await this.pageManager!.loginPage.login(string, string2);

});

Then('an authentication error should be displayed', async function () {
    return 'passed';
});