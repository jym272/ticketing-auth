import { test, expect } from '@playwright/test';
import { getSession, logFinished, logRunning, truncateTables } from '@jym272ticketing/common/dist/utils';

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.beforeEach(({}, testInfo) => logRunning(testInfo));

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.afterEach(({}, testInfo) => logFinished(testInfo));

test.describe('routes: /api/users/signout', () => {
  test.beforeAll(async ({ request }) => {
    await truncateTables('user');
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    await request.post('/api/users/signup', { data: auth });
  });
  test('signing out', async ({ request }) => {
    const response = await request.post('/api/users/signout');
    expect(response.ok()).toBe(true);
    const cookie = response.headers()['set-cookie'];
    const session = getSession(cookie);
    expect(session).toBe('asdasd');
  });
});
