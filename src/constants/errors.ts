export const ERROR_CODES = {
  UNAUTHORIZED: '401',
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  INTERNAL_SERVER_ERROR: '500',
} as const;

export const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Authentication required',
  INVALID_TOKEN: 'Invalid or expired token',
  SESSION_EXPIRED: 'Session expired',
  INVALID_CREDENTIALS: 'Invalid credentials',
  INVALID_TOKEN_SIGNATURE: 'Invalid token signature',
  TOKEN_EXPIRED: 'Token expired',
  SUBGRAPHS_ENV_NOT_SET: 'Subgraphs environment variable is not set',
} as const;

export const JWT_ERROR_CODES = {
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_TOKEN: 'INVALID_TOKEN',
} as const;

export const createGraphQLError = (message: string, code: string) => {
  return {
    message,
    extensions: { code },
  };
};
