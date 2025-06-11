export const SUBGRAPH_NAMES = {
  PAYLOAD: 'Payload-CMS',
  AUTH_SERVICE: 'Auth-Service',
  USER_SERVICE: 'User-Service',
  NOTIFICATION_SERVICE: 'Notification-Service',
} as const;

export const AUTH_TOKEN = process.env.AUTH_TOKEN;

export const JWT_OPTIONS = {
  SUBJECT: 'access',
  ALGORITHM: 'RS256' as const,
  AUDIENCE: 'https://api.nplus.com',
  ISSUER: 'NPLUS',
  EXPIRES_IN: 3600, // 1 hour
};

export const GATEWAY_CONSTANTS = {
  DEFAULT_PORT: 3000,
  AUTH_HEADER_PREFIX: 'Bearer ',
  BASIC_AUTH_PREFIX: 'Basic ',
  API_KEY_PREFIX: 'users API-Key ',
} as const;
