import { test, expect } from '@playwright/test';

test.describe('routes: utils', () => {
  test('get health route', async ({ request }) => {
    const response = await request.get('/health');
    const body = await response.body();

    expect(response.ok()).toBe(true);
    expect(body.toString()).toBe('OK');
    expect(response.status()).toBe(200);
  });
  test('get env route, compare PORT', async ({ request }) => {
    const response = await request.get('/env');
    const body = await response.body();
    // https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
    const envObject = JSON.parse(body.toString()) as Record<string, string>;

    expect(envObject.PORT).toBe(process.env.PORT);
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);
  });
  test('wildcard route', async ({ request }) => {
    const randomString = Math.random().toString(36).substring(7);
    const response = await request.get(`/${randomString}`);
    const body = await response.body();
    expect(response.ok()).toBe(false);
    expect(body.toString()).toBe('Not Found!');
    expect(response.status()).toBe(404);
  });
});
