import { test, expect } from 'playwright/test';

test.describe('contains aricles from all categories', () => {
    test.beforeEach (async ({page}) => {
        await page.goto('https://relay.prototyp.digital/');

    })

test ('Contains articles from all categories', async ({page}) => {
    const expectedCategories = ['Websites', 'Product Design', 'Illustration', 'Architecture', 'Branding', 'Graphic Design'];
    const categoryLinks = page.locator('article a[href*="/category/"]');
    const count = await categoryLinks.count();
    // Loop through all category links and check if their text matches one of the expected categories
    for (let i=0; i < count; i++) {
        const text = await categoryLinks.nth(i).innerText();
        expect(expectedCategories).toContain(text);
    }

})

test ('Measures page load time', async ({page}) => {
  // Measure page load time
    const performanceTiming = await page.evaluate (() =>
        JSON.stringify(window.performance.timing));
    const timing = JSON.parse(performanceTiming);
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`Load time: ${loadTime}ms`);

})

test ('Verifies that all text elements are correctly forrmated', async ({page}) => {
  // Check font size of "Relay" heading
    await expect(page.locator('.css-1nf9552')).toHaveCSS('font-size', '24px');
  // Check font size of category names
    const categoryNames = page.locator('.css-nzumy8');
    const categoryCount = await categoryNames.count();
        for (let i = 0; i < categoryCount; i++) {
          await expect(categoryNames.nth(i)).toHaveCSS('font-size', '12px');
        }
    // Check font size of article titles
    const articleTitles = page.locator('article h2');
    const titleCount = await articleTitles.count();
        for (let i = 0; i < titleCount; i++) {
          await expect(articleTitles.nth(i)).toHaveCSS('font-size', '32px');
        }
    // Check font size of article descriptions
    const descriptions = page.locator('article p');
    const descCount = await descriptions.count();
        for (let i = 0; i < descCount; i++) {
          await expect(descriptions.nth(i)).toHaveCSS('font-size', '12px');
        }
    
    })

test ('Opens correct detail page when clicking an article', async ({page}) => {
  // Click the first article image to open its detail page
    await page.locator('article img').first().click();
    await expect(page).toHaveURL(/\/article\//);
    // Check key elements on the article detail page are visible
    await expect(page.getByRole('link', { name: 'Branding ⟶' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom variable type for' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Visit' })).toBeVisible();
    await expect(page.getByRole('img')).toBeVisible();
    await expect(page.getByText('Plau, a type design studio')).toBeVisible();

})

test('"Visit" button leads to external redirection', async ({ page }) => {
  // Click first article image, then verify the 'Visit' button has an external URL
    await page.locator('article img').first().click();
    await expect(page).toHaveURL(/\/article\//);
    const visitLink = page.getByRole('link', { name: 'Visit' });
    await expect(visitLink).toHaveAttribute('href', /http/);
  })

test('Redirects correctly when clicking "Branding" section', async ({ page }) => {
  // Click the "Branding" menu link and verify URL change
    await page.getByRole('link', { name: 'Branding' }).click();
    await expect(page).toHaveURL(/\/category\/branding/);
  })

test('Redirects correctly to "All" section', async ({ page }) => {
  // Click the "All" link to return to the main landing page
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page).toHaveURL('https://relay.prototyp.digital/');
  })

test('Category link under image works correctly', async ({ page }) => {
   // Click each category link under article images and verify URL includes '/category/'
    const categoryLinks = page.locator('article a[href*="/category/"]');
    const count = await categoryLinks.count();
    for (let i = 0; i < count; i++) {
      await categoryLinks.nth(i).click();
      await expect(page).toHaveURL(/\/category\//);
      await page.goBack();
    }
  })

test('Each card has "by PROTOTYP" in description', async ({ page }) => {
  // Verify every article description contains 'by PROTOTYP'
    const descriptions = page.locator('article p');
    const count = await descriptions.count();
    for (let i = 0; i < count; i++) {
      await expect(descriptions.nth(i)).toContainText('by PROTOTYP');
    }
  })

test('Checks header and footer consistency', async ({ page }) => {
    const header = page.getByRole('banner');
    const footer = page.getByRole('contentinfo');
    await expect(header).toContainText('Relay');
    await expect(footer).toContainText('Relay is a cool gadget made by PROTOTYP in the year 2025. Our main goal is world domination by link sharing.');
  })

//Negative test

test('Fails if any article is not authored by PROTOTYP', async ({ page }) => {
  // Ensure no article description contains other authors, e.g., 'Terezija'
    const descriptions = page.locator('article p');
    const count = await descriptions.count();
    for (let i = 0; i < count; i++) {
      const text = await descriptions.nth(i).innerText();
      expect(text).toContain('by PROTOTYP');
      expect(text).not.toContain('Terezija');
    }
  })

})















