import { test, expect } from '@playwright/test';

test.describe('Navigation links test', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to the "Websites" category page before each test
      await page.goto('https://relay.prototyp.digital/category/websites');

    })

test('Opens detail page on card click', async ({ page }) => {
    await page.locator('article img').first().click();
    await expect(page).toHaveURL(/\/article\//);
  });


test('"Visit" button leads to external redirection', async ({ page }) => {
  // Click on the first article image to open the detail page
    await page.locator('article img').first().click();
    await expect(page).toHaveURL(/\/article\//);
    const visitLink = page.getByRole('link', { name: 'Visit' });
    // Check that the "Visit" link has an external URL
    await expect(visitLink).toHaveAttribute('href', /http/);
  })

test('"Websites" link returns to the section', async ({ page }) => {
    await page.locator('article img').first().click();
    await page.getByRole('link', { name: 'Websites ⟶' }).click();
    await expect(page).toHaveURL(/\/category\/websites/);
  })

test('Category link in the card description works', async ({ page }) => {
  // Locate all links within articles that link to the Websites
    const categoryLinks = page.locator('article a[href*="/category/websites/"]');
    const count = await categoryLinks.count();
    for (let i = 0; i < count; i++) {
      // Click each category link and verify it navigates to the Websites category page, then go back
      await categoryLinks.nth(i).click();
      await expect(page).toHaveURL(/\/category\/websites/);
      await page.goBack();
    }
  })

test('Each card has "by PROTOTYP" in description', async ({ page }) => {
    const descriptions = page.locator('article p');
    const count = await descriptions.count();
    // Verify each description contains the text "by PROTOTYP"
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

test('Only "Website" articles are listed', async ({ page }) => {
    const categoryLabels = page.locator('article p');
    const count = await categoryLabels.count();
    // Check each article description contains the text "Websites", ensuring no other category articles appear
    for (let i = 0; i < count; i++) {
        await expect(categoryLabels.nth(i)).toContainText('Websites');
    }
  })
 

})
