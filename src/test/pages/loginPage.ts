import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }   

    private Elements = {
        username: () => this.page.getByRole('textbox', { name: 'Username' }),
        password: () => this.page.getByRole('textbox', { name: 'Password' }),
        loginButton: () => this.page.locator('span').filter({ hasText: 'Login' }).last(),      
        loggedInUser: () => this.page.getByText('tester123!'),  
    }

    async login(username: string, password: string) {
        await this.Elements.username().fill(username);
        await this.Elements.password().fill(password);
        await this.Elements.loginButton().click();
    }
    async isLoggedIn() {
        return await this.isVisible(this.Elements.loggedInUser());
    }

    

}



