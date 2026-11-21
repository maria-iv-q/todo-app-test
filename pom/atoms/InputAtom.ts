import { BaseAtom } from './BaseAtom';

export class InputAtom extends BaseAtom {
    async fillAndEnter(text: string): Promise<void> {
        await this.locator.fill(text);
        await this.locator.press('Enter');
    }
}