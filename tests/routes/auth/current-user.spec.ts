import { test, expect } from '@playwright/test';
import { logFinished, logRunning, truncateUserTable } from '../../test-utils';
import { JwtPayloadCustom } from '@custom-types/index';
import { signJwtTokenOptions } from '@utils/constants';

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.beforeEach(({}, testInfo) => logRunning(testInfo));

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.afterEach(({}, testInfo) => logFinished(testInfo));

test.describe('routes: /api/users/current-user user signup', () => {
  const auth = {
    password: 'ValidPassword1234',
    email: 'email@valid.email'
  };
  test.beforeAll(async ({ request }) => {
    await truncateUserTable();
    // the cookie is set in the browser
    await request.post('/api/users/signup', { data: auth });
  });
  test('details about the current user', async ({ request }) => {
    // the follow request attaches the cookie to the request
    const response = await request.get('/api/users/current-user');
    const body = await response.body();
    const { currentUser } = JSON.parse(body.toString()) as { currentUser: JwtPayloadCustom | null };
    expect(response.ok()).toBe(true);
    expect(currentUser).toBeDefined();
    if (!currentUser) {
      throw new Error('currentUser is not defined');
    }
    expect(currentUser.permissions.authenticated).toBe(true);
    expect(typeof currentUser.iat).toBe('number');
    expect(typeof currentUser.exp).toBe('number');
    expect(typeof currentUser.sub).toBe('string');
    expect(typeof currentUser.jti).toBe('string');
    expect(currentUser.jti).toMatch(/^\d+$/);
    expect(currentUser.sub).toBe(auth.email);
    expect(currentUser.iss).toBe(signJwtTokenOptions.ISSUER);
    expect(currentUser.aud).toBe(signJwtTokenOptions.AUDIENCE);
  });
});

test.describe('routes: /api/users/current-user user null', () => {
  test.beforeAll(async () => {
    await truncateUserTable();
  });
  test('there user was never signup or signin, there is no cookie', async ({ request }) => {
    const response = await request.get('/api/users/current-user');
    const body = await response.body();
    const { currentUser } = JSON.parse(body.toString()) as { currentUser: JwtPayloadCustom | null };
    expect(response.ok()).toBe(true);
    expect(currentUser).toBeNull();
  });
});

test.describe('routes: /api/users/current-user user exists but it was removed from db', () => {
  const auth = {
    password: 'ValidPassword1234',
    email: 'email@valid.email'
  };
  test.beforeAll(async ({ request }) => {
    await truncateUserTable();
    await request.post('/api/users/signup', { data: auth });
  });
  test.beforeEach(async () => {
    await truncateUserTable();
  });
  test('cookie exists, user signup but was removed from db', async ({ request }) => {
    const response = await request.get('/api/users/current-user');
    const body = await response.body();
    const { currentUser } = JSON.parse(body.toString()) as { currentUser: JwtPayloadCustom | null };
    expect(response.ok()).toBe(true);
    expect(currentUser).toBeNull();
  });
});
