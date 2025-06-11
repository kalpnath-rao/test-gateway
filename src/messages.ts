export const ERROR = {
  SESSION_EXPIRED: {
    statusCode: 440,
    message: 'Your session has been expired. Please login again.',
    type: 'SESSION_EXPIRED',
  },
  ACCOUND_BLOCKED: {
    statusCode: 423,
    message: 'Your account have been blocked.',
    type: 'ACCOUND_BLOCKED',
  },
  INVALID_TOKEN: {
    statusCode: 419,
    message: 'Your session has been expired. Please login again.',
    type: 'INVALID_TOKEN',
  },
  INVALID_ENVIRONMENT: {
    statusCode: 400,
    message: 'Invalid environment.',
    type: 'INVALID_ENVIRONMENT',
  },
  AUTH_TOKEN_REQUIRED: {
    statusCode: 400,
    message: 'Auth-token required.',
    type: 'AUTH_TOKEN_REQUIRED',
  },
  SCHEME_NOT_VALID: {
    statusCode: 401,
    message: 'Scheme invalid.',
    type: 'SCHEME_NOT_VALID',
  },
};
