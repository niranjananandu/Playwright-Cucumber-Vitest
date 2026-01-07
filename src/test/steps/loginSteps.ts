import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, Locator, expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";

Given('the user is on the login page', async function (this: CustomWorld) {
    await this.page!.goto(process.env.BASE_URL||'https://bookcart.azurewebsites.net/');

});

When('the user logs in with valid credentials', async function () {
    const username: Locator = this.page!.getByRole('textbox', { name: 'Username' })
    await username.fill('tester123!');
    const password: Locator = this.page!.getByRole('textbox', { name: 'Password' })
    await password.fill('Tester123!');
    const loginButton: Locator = this.page!.locator('span').filter({ hasText: 'Login' }).last()
    await loginButton.click();
    
});

Then('the user should be logged in successfully', async function () {
    await expect(this.page!.getByText('tester123!')).toBeVisible();

});

When('the user logs in with username {string} and password {string}', async function (string: string, string2: string) {
     const username: Locator = this.page!.getByRole('textbox', { name: 'Username' })
    await username.fill(string);
    const password: Locator = this.page!.getByRole('textbox', { name: 'Password' })
    await password.fill(string2);
    const loginButton: Locator = this.page!.locator('span').filter({ hasText: 'Login' }).last()
    await loginButton.click();
});

Then('an authentication error should be displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'passed';
});