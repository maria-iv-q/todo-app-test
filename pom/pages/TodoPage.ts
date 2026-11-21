import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderOrganism } from '../organisms/HeaderOrganism';
import { TodoListOrganism } from '../organisms/ToDoListOrganism';
import { FilterBarOrganism } from '../organisms/FilterBarOrganism';

export class TodoPage extends BasePage {
    readonly header: HeaderOrganism;
    readonly todoList: TodoListOrganism;
    readonly filterBar: FilterBarOrganism;
    readonly infoFooter: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderOrganism(page);
        this.todoList = new TodoListOrganism(page);
        this.filterBar = new FilterBarOrganism(page);
        this.infoFooter = page.locator('footer.info');
    }
}