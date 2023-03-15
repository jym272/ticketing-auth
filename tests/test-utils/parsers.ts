import { APIResponse } from '@playwright/test';

export const parseMessage = async (response: APIResponse) => {
  const body = await response.body();
  const { message } = JSON.parse(body.toString()) as { message: string };
  return message;
};

export const getSession = (cookie: string) => {
  const dataValues = cookie.split(';');
  for (const value of dataValues) {
    if (value.trim().startsWith('session')) {
      return value.split('=')[1];
    }
  }
  return '';
};
