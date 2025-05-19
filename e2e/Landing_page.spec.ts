import { test, expect } from '@playwright/test';

test.describe('Landing page test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://relay.prototyp.digital/');
  })

  test('Navigates to the "Branding" section', async ({ page }) => {
    await page.getByRole('link', { name: 'Branding' }).click();
    await expect(page.getByRole('link', { name: 'Branding' })).toBeVisible();
  })

  test('Clicking "Relay" logo leads to the homepage', async ({page}) => {
    await page.getByRole('link', { name: 'Relay' }).click();
    await expect(page).toHaveURL('https://relay.prototyp.digital/');

  })

  test('Navigates trough pages with "Next" and "Previuos" buttons', async ({ page }) => {
    // Go forward and back to ensure both pagination buttons work
    await page.getByRole('link', { name: 'Next page' }).click(); 
    await page.getByRole('link', { name: 'Previous page' }).click();

    })


  test('Page shows max 20 cards', async ({ page }) => {
    const cards = await page.locator('article');
    const count = await cards.count();
    // Each page should display at most 20 articles
    expect(count).toBeLessThanOrEqual(20);

    })

  test('Clicks first 3 article titles on the first page', async ({ page }) => {
    await page.goto('https://relay.prototyp.digital/');
    
      for (let i = 0; i < 3; i++) {
        const article = page.locator('article').nth(i);
        await expect(article).toBeVisible();
    
        // Click on the article title
        const title = article.locator('h2[data-comp="title"]');
        await title.click();
    
        await expect(page).toHaveURL(/\/article\//);
    
        // Go back to the homepage
        await page.goBack();
    
        // Ensure the page is loaded again
        await expect(page.locator('article').nth(i)).toBeVisible();
      }
    });

    
    test('Cards have category name and description "by PROTOTYP"', async ({ page }) => {
      const articles = page.getByRole('article');
      const count = await articles.count();
  
      for (let i = 0; i < count; i++) {
        const article = articles.nth(i);
        const paragraph = article.getByRole('paragraph');
        // Description should include author text and category info
        await expect(paragraph).toContainText('by PROTOTYP');
        await expect(paragraph).toContainText('/category/');
      }
    })

    test('Footer link redirects to the Prototyp website', async ({ page }) => {
      // External footer link should redirect to the official Prototyp site
      const footerLink = page.getByRole('link', { name: 'PROTOTYP' });
      await expect(footerLink).toHaveAttribute('href', 'https://prototyp.digital');
    })


  //Negative tests

  test('First page has only "Next page" button', async ({ page }) => {
     // On page 1, the "Previous page" button should not be visible
    await expect(page.getByText('Previous page')).not.toBeVisible();
  })

  test('Last page has only "Previous page" button', async ({ page }) => {
    await page.goto('https://relay.prototyp.digital/?direction=next&page=YXJyYXljb25uZWN0aW9uOjc5');
    // On the last page, "Next page" should no longer be shown
    await expect(page.getByText('Next page')).not.toBeVisible();
  })
  

})
