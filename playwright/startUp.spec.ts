import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // await expect(
  //   page.getByRole('heading', {
  //     name: 'Lost in Lone',
  //   }),
  // ).toBeVisible();
});
