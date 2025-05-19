import { test, expect } from '@playwright/test';

test.describe('Navigation links test', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://relay.prototyp.digital/');
      // Scroll to the main section to ensure visibility of the form
      await page.locator('section').scrollIntoViewIfNeeded();
    })

test('Fills in needed information', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Your name' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('Terezija');
    await page.getByRole('textbox', { name: 'Your e-mail (required)' }).click();
    await page.getByRole('textbox', { name: 'Your e-mail (required)' }).fill('test@gmail.com');
    await page.getByRole('checkbox', { name: 'Yes, I agree' }).check();
    await page.getByRole('button', { name: 'Subscribe' }).click();
    
      })

//Negative test

test('Shows error when submitting empty name, invalid email and unchecked consent', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Your name' }).click();
    await page.getByRole('textbox', { name: 'Your name' }).fill('');
    await page.getByRole('textbox', { name: 'Your e-mail (required)' }).click();
    await page.getByRole('textbox', { name: 'Your e-mail (required)' }).fill('invalidemail');
    await page.getByRole('checkbox', { name: 'Yes, I agree' }).uncheck();
    await expect(page.locator('#mc-embedded-subscribe-form')).toHaveAttribute('action', /https:\/\/digital\.us19\.list-manage\.com\/subscribe\/post\?u=b5e6f2147bd0d589ab2183654&id=73a0b2fd84/);
   
  })

})