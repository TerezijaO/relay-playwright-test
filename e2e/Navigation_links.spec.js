import { test, expect } from '@playwright/test';

test.describe('Navigation links test', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('https://relay.prototyp.digital/');
    })

test('Opens "Websites" section', async ({ page }) => {
    // Click on the "Website" category link and verify URL
    await page.click('[href="/category/websites"]');
    await expect(page).toHaveURL(/\/category\/websites/);
    })

test('Opens "Product Design" section', async ({ page }) => {
    // Click on the "Product Design" category link and verify URL
        await page.click('[href="/category/product-design"]');
        await expect(page).toHaveURL(/\/category\/product-design/);
    })
    
test('Opens "Illustration" section', async ({ page }) => {
    // Click on the "Illustration" category link and verify URL
        await page.click('[href="/category/illustration"]');
        await expect(page).toHaveURL(/\/category\/illustration/);
    })
    
test('Opens "Architecture" section', async ({ page }) => {
    // Click on the "Architecture" category link and verify URL
        await page.click('[href="/category/architecture"]');
        await expect(page).toHaveURL(/\/category\/architecture/);
    })
    
test('Opens "Branding" section', async ({ page }) => {
    // Click on the "Branding" category link and verify URL
        await page.click('[href="/category/branding"]');
        await expect(page).toHaveURL(/\/category\/branding/);
    })
    
test('Opens "Graphic Design" section', async ({ page }) => {
    // Click on the "Graphic Design" category link and verify URL
        await page.click('[href="/category/graphic-design"]');
        await expect(page).toHaveURL(/\/category\/graphic-design/);
    })


//Negative test

test('Empty category test', async ({ page }) => {
    await page.goto('https://relay.prototyp.digital/category/design');
    // Verify the message indicating no articles in the category is visible
    await expect(page.getByText('There are currently no articles in this category')).toBeVisible();
  })



})    