import { expect, test } from '@playwright/test';

test('input test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // await expect(page.locator('[id="chat-logo"]')).toBeVisible();

  await expect(page.getByRole('textbox')).toBeVisible();
  await page.getByRole('textbox').fill('this is a playwright test');
  await page.getByRole('button', { name: 'Send' }).click();
  await expect(page.getByRole('textbox')).toHaveValue('');
});
