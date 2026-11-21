import { BaseAtom } from './BaseAtom';

export class LinkAtom extends BaseAtom {
    async click(): Promise<void> {
        await this.locator.click();
    }
}