export interface Credentials {
  password: string;
  email: string;
}

export interface ErrorWithStatus extends Error {
  statusCode: number;
}
