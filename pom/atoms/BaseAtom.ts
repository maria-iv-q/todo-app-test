import { Locator } from '@playwright/test';

export abstract class BaseAtom {
    readonly locator: Locator;

    constructor(locator: Locator) {
        this.locator = locator;
    }

    async hover(): Promise<void> {
        await this.locator.hover();
    }
}