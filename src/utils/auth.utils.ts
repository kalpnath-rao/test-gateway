import { GraphQLError } from 'graphql';
import { verifyAuthToken, genAccessToken } from './jwt.util';
import { ERROR_CODES, ERROR_MESSAGES, createGraphQLError } from '../constants/errors';
import { GATEWAY_CONSTANTS } from '../constants/constants';
import { RequestContext, TokenPayload } from '../types/gateway.types';
import { hiveLogger } from './logger';

export const handleAuthError = (error: unknown, message: string, code: string) => {
  hiveLogger.error('Authentication Error', {
    message: error instanceof Error ? error.message : message,
    code,
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  throw new GraphQLError(message, createGraphQLError(message, code));
};

export const handleApiKeyAuth = (context: RequestContext, apiKey: string) => {
  context.request.headers.set('authorization', `${GATEWAY_CONSTANTS.API_KEY_PREFIX}${apiKey}`);
  return { isAuthenticated: true };
};

export const handleMfaTokenAuth = (context: RequestContext, mfaToken: string) => {
  context.request.headers.set('authorization', mfaToken);
  return { isAuthenticated: true };
};

export const handleBasicAuth = (authHeader: string) => {
  if (authHeader.startsWith(GATEWAY_CONSTANTS.BASIC_AUTH_PREFIX)) {
    return { isAuthenticated: true };
  }
  return null;
};

export const handleBearerTokenAuth = (context: RequestContext, authHeader: string) => {
  if (authHeader.startsWith(GATEWAY_CONSTANTS.AUTH_HEADER_PREFIX)) {
    const token = authHeader.split(GATEWAY_CONSTANTS.AUTH_HEADER_PREFIX)[1];
    if (token) {
      try {
        const artifacts = verifyAuthToken(token);
        const payload: TokenPayload = {
          tid: artifacts.tid,
          typ: artifacts.typ,
          aid: artifacts.aid,
        };

        const accessToken = genAccessToken(payload);
        context.request.headers.set(
          'authorization',
          `${GATEWAY_CONSTANTS.AUTH_HEADER_PREFIX}${accessToken}`
        );
        return { isAuthenticated: true };
      } catch (error) {
        handleAuthError(error, ERROR_MESSAGES.INVALID_TOKEN, ERROR_CODES.UNAUTHORIZED);
      }
    }
  }
  return null;
};
