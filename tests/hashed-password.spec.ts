import { test, expect } from '@playwright/test';

test.describe('routes: /hashed-password', () => {
  test('hashing a new password', async ({ request }) => {
    const auth = {
      password: 'password',
      email: 'email@email.com'
    };
    const response = await request.post('/hashed-password', { data: auth });
    const body = await response.body();
    const { message } = JSON.parse(body.toString()) as { message: string };
    expect(response.ok()).toBe(true);
    expect(message).toBe('Auth created.');
    expect(response.status()).toBe(200);
  });
  test('hashing the same password is an error, email is unique', async ({ request }) => {
    const auth = {
      password: 'password',
      email: 'email@email.com'
    };
    const response = await request.post('/hashed-password', { data: auth });
    const body = await response.body();
    const { message } = JSON.parse(body.toString()) as { message: string };
    expect(response.ok()).toBe(false);
    expect(message).toBe('Creating Auth failed.');
    expect(response.status()).toBe(401);
  });
});
