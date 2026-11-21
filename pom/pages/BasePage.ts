import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly baseUrl: string;

    constructor(page: Page, baseUrl: string = '/') {
        this.page = page;
        this.baseUrl = baseUrl;
    }

    async open(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }
}