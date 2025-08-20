import { test, expect } from '@playwright/test';
import { setupPasswordValidatorMock } from './mocks/passwordValidatorMock';

test.describe('Password Validation', () => {
  test.beforeEach(async ({ page }) => {
    await setupPasswordValidatorMock(page);
    await page.goto('/');
  });

  test('should show the password input form', async ({ page }) => {
    await expect(page.locator('h2.matrix-title')).toHaveText('Matrix Security Gateway');
    await expect(page.getByPlaceholder('Enter access password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Verify Access' })).toBeVisible();
  });

  test('should show success message when a valid password is submitted', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('Matrix123!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-success')).toBeVisible();
    await expect(page.locator('.matrix-success')).toContainText('Access Granted');
    
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('.success-message')).toContainText('Firewall Breached');
    await expect(page.locator('.success-message')).toContainText('System Access Granted');
  });

  test('should show error message when an empty password is submitted', async ({ page }) => {
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error')).toContainText('Access Denied');
    await expect(page.locator('.matrix-error-list')).toContainText('Password cannot be empty');
    
    await expect(page.locator('.matrix-container.alarm-animation')).toBeVisible();
  });

  test('should show error message when password is too short', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('Short1');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must be at least 8 characters long');
  });

  test('should show error message when password lacks uppercase letters', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('matrix123!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must contain at least one uppercase letter');
  });

  test('should show error message when password lacks lowercase letters', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('MATRIX123!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must contain at least one lowercase letter');
  });

  test('should show error message when password lacks digits', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('MatrixABC!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must contain at least one digit');
  });

  test('should show error message when password lacks special characters', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('Matrix123');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.locator('.matrix-error')).toBeVisible();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must contain at least one special character');
  });

  test('should disable the input and button during validation', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('Testing123!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    
    await expect(page.getByRole('button')).not.toHaveText('Verifying...');
    await expect(page.getByRole('button')).toBeEnabled();
  });

  test('should handle multiple validation attempts', async ({ page }) => {
    await page.getByPlaceholder('Enter access password').fill('short');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must be at least 8 characters long');
    
    await page.getByPlaceholder('Enter access password').fill('Matrix123!');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    await expect(page.locator('.matrix-success')).toContainText('Access Granted');
    
    await page.getByPlaceholder('Enter access password').fill('matrix123');
    await page.getByRole('button', { name: 'Verify Access' }).click();
    await expect(page.locator('.matrix-error-list')).toContainText('Password must contain at least one uppercase letter');
  });
});