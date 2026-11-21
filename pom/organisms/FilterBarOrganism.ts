import { Locator, Page } from '@playwright/test';
import { ButtonAtom } from '../atoms/ButtonAtom';
import { LinkAtom } from '../atoms/LinkAtom';

export class FilterBarOrganism {
    readonly footerContainer: Locator;
    readonly counter: Locator;
    readonly allLink: LinkAtom;
    readonly activeLink: LinkAtom;
    readonly completedLink: LinkAtom;
    readonly clearCompletedButton: ButtonAtom;

    constructor(page: Page) {
        this.footerContainer = page.getByTestId('footer');
        this.counter = this.footerContainer.locator('.todo-count');
        this.allLink = new LinkAtom (this.footerContainer.getByRole('link', { name: 'All' }));
        this.activeLink = new LinkAtom (this.footerContainer.getByRole('link', { name: 'Active' }));
        this.completedLink = new LinkAtom (this.footerContainer.getByRole('link', { name: 'Completed' }));
        this.clearCompletedButton = new ButtonAtom(this.footerContainer.getByRole('button', { name: 'Clear completed' }));
    }
}