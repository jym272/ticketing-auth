import { test, expect } from '@playwright/test';
import { logFinished, logRunning, parseMessage, truncateUserTable } from '../../test-utils';
import { httpStatusCodes } from '@utils/statusCodes';
const { BAD_REQUEST, CREATED, CONFLICT } = httpStatusCodes;

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.beforeEach(({}, testInfo) => logRunning(testInfo));

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.afterEach(({}, testInfo) => logFinished(testInfo));

test.describe('routes: /api/users/signup creating a user', () => {
  test.beforeAll(async () => {
    await truncateUserTable();
  });
  test('invalid password', async ({ request }) => {
    const auth = {
      password: 'password',
      email: 'email@email.com'
    };
    const response = await request.post('/api/users/signup', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Invalid credentials.');
    expect(response.status()).toBe(BAD_REQUEST);
  });
  test('invalid email', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@invalidemail'
    };
    const response = await request.post('/api/users/signup', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Invalid credentials.');
    expect(response.status()).toBe(BAD_REQUEST);
  });
  test('User created', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signup', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(true);
    expect(message).toBe('User created.');
    expect(response.status()).toBe(CREATED);
  });
});

test.describe('routes: /api/users/signup user already exists', () => {
  test.beforeAll(async ({ request }) => {
    await truncateUserTable();
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    await request.post('/api/users/signup', { data: auth });
  });
  test('User already created', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signup', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Email already exists.');
    expect(response.status()).toBe(CONFLICT);
  });
});

test.describe('routes: /api/users/signup checking jwt cookie after successful signup', () => {
  test.beforeAll(async () => {
    await truncateUserTable();
  });
  test("Checking jwt cookie, it's going to failed if NODE_ENV is not test", async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signup', { data: auth });
    expect(response.ok()).toBe(true);
    const cookie = response.headers()['set-cookie'];
    expect(cookie).toBeDefined();
  });
});
