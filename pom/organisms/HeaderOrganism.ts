import { Locator, Page } from '@playwright/test';
import { InputAtom } from '../atoms/InputAtom';

export class HeaderOrganism {
    readonly heading: Locator;
    readonly newTodoInput: InputAtom;
    readonly toggleAllButton: Locator;

    constructor(page: Page) {
        this.heading = page.getByRole('heading', { name: 'todos' });
        this.newTodoInput = new InputAtom(page.getByPlaceholder('What needs to be done?'));
        this.toggleAllButton = page.locator('.toggle-all');
    }

    async createTodo(text: string): Promise<void> {
        await this.newTodoInput.fillAndEnter(text);
    }
}