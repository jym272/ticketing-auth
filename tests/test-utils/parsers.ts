import { APIResponse } from '@playwright/test';

export const parseMessage = async (response: APIResponse) => {
  const body = await response.body();
  const { message } = JSON.parse(body.toString()) as { message: string };
  return message;
};
