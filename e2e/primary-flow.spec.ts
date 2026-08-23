import { test, expect } from '@playwright/test';

test.describe('Portify Primary User Flow', () => {
  test('Edits user profile, interacts with AI Copilot, and switches live previews', async ({ page }) => {
    // 1. Visit the root URL
    await page.goto('/');

    // 2. Verify Portify brand is present
    await expect(page.getByRole('heading', { name: 'Portify' })).toBeVisible();

    // 3. Check Visual Studio / Profile input
    await page.getByRole('button', { name: /Visual Studio/i }).first().click();
    const nameInput = page.locator('input[value="Amina Ajaz"]');
    await expect(nameInput).toBeVisible();

    // Type a revised headline or bio
    await nameInput.fill('Amina Ajaz');

    // 4. Switch to AI Copilot & ATS Tab
    await page.getByRole('button', { name: /AI Copilot & ATS/i }).first().click();
    await expect(
      page.getByText(/Portify AI Portfolio Copilot/i)
    ).toBeVisible();

    // 5. Test Quick Action / 1-Click Audit
    const auditBtn = page.getByRole('button', { name: /Run 1-Click Portfolio Audit/i }).first();
    await auditBtn.click();
    await expect(page.getByText(/Portfolio Readiness Audit/i)).toBeVisible();

    // 6. Navigate to Live Preview
    await page.getByRole('button', { name: /Live Preview/i }).first().click();
    await expect(page.getByText(/Desktop/i)).toBeVisible();
  });
});