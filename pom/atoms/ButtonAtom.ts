import { BaseAtom } from './BaseAtom';

export class ButtonAtom extends BaseAtom {
    async click(): Promise<void> {
        await this.locator.click();
    }
}