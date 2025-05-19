import { test, expect } from '@playwright/test';


test.describe ('Regression test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://relay.prototyp.digital/');
    })

test ('Contains articles from all categories', async ({page}) => {
  // List of expected categories that articles should belong to
        const expectedCategories = ['Websites', 'Product Design', 'Illustration', 'Architecture', 'Branding', 'Graphic Design'];
        const categoryLinks = page.locator('article a[href*="/category/"]');
        const count = await categoryLinks.count();
        // Verify each category link text matches one of the expected categories
        for (let i=0; i < count; i++) {
            const text = await categoryLinks.nth(i).innerText();
            expect(expectedCategories).toContain(text);
        }   
    })

test('Navigates trough sections', async ({ page }) => {
  // For each category, go to homepage, click the category link and verify URL
    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/websites"]');
    await expect(page).toHaveURL(/\/category\/websites/);

    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/product-design"]');
    await expect(page).toHaveURL(/\/category\/product-design/);
            
    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/illustration"]');
    await expect(page).toHaveURL(/\/category\/illustration/);
               
    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/architecture"]');
    await expect(page).toHaveURL(/\/category\/architecture/);
               
    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/branding"]');
    await expect(page).toHaveURL(/\/category\/branding/);
              
    await page.goto('https://relay.prototyp.digital/');
    await page.click('[href="/category/graphic-design"]');
    await expect(page).toHaveURL(/\/category\/graphic-design/);

  })


test('Verifies correct detail page opens from card click in all categories', async ({ page }) => {
    // List of expected categories that articles should belong to
    const categories = ['websites', 'product-design', 'illustration', 'architecture', 'branding', 'graphic-design'];
  
    for (const category of categories) {
      // Navigate to the category page
      await page.goto(`https://relay.prototyp.digital/category/${category}`);
      
      const cards = page.locator('h2[data-comp="title"]');
      const count = await cards.count();
       // For each card, click and verify detail page content, then navigate back
      for (let i = 0; i < count; i++) {
        await cards.nth(i).click();
        
        await expect(page).toHaveURL(/\/article/);
        await expect(page.locator('img')).toBeVisible();
        await expect(page.getByRole('link', { name: 'Visit' })).toBeVisible();
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('p')).toBeVisible();
  
        await page.goBack();
      }
    }
  });

test('"Visit" button leads to external redirection', async ({ page }) => {
    const categories = ['websites', 'product-design', 'illustration', 'architecture', 'branding', 'graphic-design'];

    for (const category of categories) {
      await page.goto(`https://relay.prototyp.digital/category/${category}`);
      // Get all article title elements
      const cards = await page.locator('h2[data-comp="title"]').all();
      for (const card of cards) {
        // Click on the card to open the detail page
        await card.click();
        const visitButton = page.getByRole('link', { name: 'Visit' });
        await expect(visitButton).toHaveAttribute('href', /https?:\/\//);
      }
    }
  })



})