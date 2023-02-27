import { test, expect } from '@playwright/test';

test.describe('routes: home', () => {
  test('get home route', async ({ request }) => {
    const response = await request.get('/');
    const body = await response.body();

    expect(response.ok()).toBe(true);
    expect(body.toString()).toBe('Hello there!');
    expect(response.status()).toBe(200);
  });
});
