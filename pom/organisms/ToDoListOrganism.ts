import { Locator, Page } from '@playwright/test';

export class TodoListOrganism {
    readonly toDoListContainer: Locator;
    readonly items: Locator;

    constructor(page: Page) {
        this.toDoListContainer = page.locator('.todo-list');
        this.items = this.toDoListContainer.getByTestId('todo-item');
    }

    getItemByText(text: string): Locator {
        return this.items.filter({ hasText: text });
    }

    async toggleItem(text: string): Promise<void> {
        await this.getItemByText(text).locator('.toggle').click();
    }

    async deleteItem(text: string): Promise<void> {
        const item = this.getItemByText(text);
        await item.hover();
        await item.locator('.destroy').click();
    }

}