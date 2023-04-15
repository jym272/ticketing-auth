import { test, expect } from '@playwright/test';
import {
  getSession,
  httpStatusCodes,
  logFinished,
  logRunning,
  parseMessage,
  truncateTables
} from '@jym272ticketing/common/dist/utils';
const { BAD_REQUEST, OK } = httpStatusCodes;

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.beforeEach(({}, testInfo) => logRunning(testInfo));

// eslint-disable-next-line no-empty-pattern -- because we need to pass only the testInfo
test.afterEach(({}, testInfo) => logFinished(testInfo));

test.describe('routes: /api/users/signin', () => {
  test('invalid password', async ({ request }) => {
    const auth = {
      password: 'password',
      email: 'email@email.com'
    };
    const response = await request.post('/api/users/signin', { data: auth });
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
    const response = await request.post('/api/users/signin', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Invalid credentials.');
    expect(response.status()).toBe(BAD_REQUEST);
  });
  test('user not found', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signin', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Invalid credentials.');
    expect(response.status()).toBe(BAD_REQUEST);
  });
});

test.describe('routes: /api/users/signup user enters wrong password', () => {
  test.beforeAll(async ({ request }) => {
    await truncateTables('user');
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    await request.post('/api/users/signup', { data: auth });
  });
  test('user enters wrong password', async ({ request }) => {
    const auth = {
      password: 'BalidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signin', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(false);
    expect(message).toBe('Invalid credentials.');
    expect(response.status()).toBe(BAD_REQUEST);
  });
});

test.describe('routes: /api/users/signin the user logs in successfully', () => {
  test.beforeAll(async ({ request }) => {
    await truncateTables('user');
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    await request.post('/api/users/signup', { data: auth });
  });
  test('user logs in successfully', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signin', { data: auth });
    const message = await parseMessage(response);
    expect(response.ok()).toBe(true);
    expect(message).toBe('User logged in.');
    expect(response.status()).toBe(OK);
  });
});

test.describe('routes: /api/users/signin the logged in user receives a cookie', () => {
  test.beforeAll(async ({ request }) => {
    await truncateTables('user');
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    await request.post('/api/users/signup', { data: auth });
  });
  test('checking cookie', async ({ request }) => {
    const auth = {
      password: 'ValidPassword1234',
      email: 'email@valid.email'
    };
    const response = await request.post('/api/users/signin', { data: auth });
    expect(response.ok()).toBe(true);
    const cookie = response.headers()['set-cookie'];
    expect(cookie).toBeDefined();
    const session = getSession(cookie);
    expect(session).not.toBe('');
  });
});
