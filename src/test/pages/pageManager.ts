import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";

export class PageManager  {

    loginPage: LoginPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
    }   
}   