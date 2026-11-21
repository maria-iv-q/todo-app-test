import { test, expect } from '@playwright/test';
import {TodoPage} from "../pom/pages/TodoPage";

test.describe("ToDo app tests", () => {
    test.beforeEach(async ({ page }) => {
      const todoPage = new TodoPage(page);
      await todoPage.open();
  })

  test('TL-19-1 Create one Todo item', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('apple')
    await expect(todoPage.todoList.items).toBeVisible();
  });

  test('TL-19-2 Create two Todo items', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.filterBar.counter).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    await todoPage.header.createTodo('lemon')
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    expect(await todoPage.todoList.items.count()).toBe(2);
  });

  test('TL-19-3 Create two Todo items -> activate 1 -> click "clear completed"', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    await todoPage.header.createTodo('lemon')
    expect(await todoPage.todoList.items.count()).toBe(2);
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    await todoPage.todoList.toggleItem('banana')
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    expect(await todoPage.todoList.items.count()).toBe(2);
    await todoPage.filterBar.clearCompletedButton.click();
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    expect(await todoPage.todoList.items.count()).toBe(1);
    await expect (todoPage.todoList.getItemByText('banana')).not.toBeVisible();
  });

  test('TL-19-4 Create two Todo items -> set active filter -> activate 1 -> check 1 on completed filter', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    await todoPage.header.createTodo('lemon')
    expect(await todoPage.todoList.items.count()).toBe(2);
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    await todoPage.filterBar.activeLink.click();
    await todoPage.todoList.toggleItem('banana')
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    expect(await todoPage.todoList.items.count()).toBe(1);
    await expect (todoPage.todoList.getItemByText('lemon')).toBeVisible();
    await todoPage.filterBar.completedLink.click();
    expect(await todoPage.todoList.items.count()).toBe(1);
    await expect (todoPage.todoList.getItemByText('banana')).toBeVisible();
  });

  test('TL-19-5 Create one Todo item -> activate it', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    expect(await todoPage.todoList.items.count()).toBe(1);
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    await todoPage.todoList.toggleItem('banana')
    expect(await todoPage.filterBar.counter.innerText()).toContain('0');
    expect(await todoPage.todoList.items.count()).toBe(1);
  });

  test('TL-19-6 Create one Todo item -> delete it', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    expect(await todoPage.todoList.items.count()).toBe(1);
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    await todoPage.todoList.deleteItem('banana')
    await expect (todoPage.todoList.getItemByText('banana')).not.toBeVisible();
  });

  test('TL-19-7 Create Todo items -> set active filter', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    await todoPage.header.createTodo('lemon')
    expect(await todoPage.todoList.items.count()).toBe(2);
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    await todoPage.filterBar.activeLink.click();
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    expect(await todoPage.todoList.items.count()).toBe(2);
    await expect (todoPage.todoList.getItemByText('banana')).toBeVisible();
    await expect (todoPage.todoList.getItemByText('lemon')).toBeVisible();

  });
  test('TL-19-8 Create Todo items -> activate 1 -> verify all filter"', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await expect(todoPage.todoList.items).not.toBeVisible();
    await todoPage.header.createTodo('banana')
    await todoPage.header.createTodo('lemon')
    await todoPage.filterBar.allLink.click();
    expect(await todoPage.todoList.items.count()).toBe(2);
    expect(await todoPage.filterBar.counter.innerText()).toContain('2');
    await todoPage.todoList.toggleItem('banana')
    expect(await todoPage.filterBar.counter.innerText()).toContain('1');
    expect(await todoPage.todoList.items.count()).toBe(2);
    await expect (todoPage.todoList.getItemByText('banana')).toBeVisible();
    await expect (todoPage.todoList.getItemByText('lemon')).toBeVisible();
  });
});
