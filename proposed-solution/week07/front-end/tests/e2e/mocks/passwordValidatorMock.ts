import { Page } from '@playwright/test';

export const setupPasswordValidatorMock = async (page: Page) => {
  await page.route('https://localhost:7128/api/password-check', async (route) => {
    const requestBody = JSON.parse(await route.request().postData() || '{}');
    const password = requestBody.password;

    if (password === 'Matrix123!') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: true,
          errors: []
        })
      });
    } else if (password === '') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password cannot be empty']
        })
      });
    } else if (password.length < 8) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password must be at least 8 characters long']
        })
      });
    } else if (!/[A-Z]/.test(password)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password must contain at least one uppercase letter']
        })
      });
    } else if (!/[a-z]/.test(password)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password must contain at least one lowercase letter']
        })
      });
    } else if (!/\d/.test(password)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password must contain at least one digit']
        })
      });
    } else if (!/[!@#$%^&*]/.test(password)) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Password must contain at least one special character']
        })
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          isValid: false,
          errors: ['Invalid password format']
        })
      });
    }
  });
};