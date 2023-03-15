export const getSession = (cookie: string) => {
  const data_values = cookie.split(';');
  for (const value of data_values) {
    if (value.trim().startsWith('session')) {
      return value.split('=')[1];
    }
  }
  return '';
};
