import { defineConfig, ResolveUserFn, ValidateUserFn } from '@graphql-hive/gateway';
import dotenv from 'dotenv';
import { ERROR_CODES, ERROR_MESSAGES } from './constants/errors';
import { GATEWAY_CONSTANTS } from './constants/constants';
import { hiveLogger } from './utils/logger';
import { validateEnvVariables } from './utils/env.validator';
import { RequestContext, ValidationParams, HeaderPayload } from './types/gateway.types';
import {
  handleAuthError,
  handleApiKeyAuth,
  handleMfaTokenAuth,
  handleBasicAuth,
  handleBearerTokenAuth,
} from './utils/auth.utils';

dotenv.config();

// Validate environment variables before proceeding
validateEnvVariables();

export const gatewayConfig = defineConfig({
  graphqlEndpoint: '/',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : GATEWAY_CONSTANTS.DEFAULT_PORT,
  maskedErrors: true,
  skipValidation: false,
  logging: hiveLogger,

  propagateHeaders: {
    fromClientToSubgraphs(payload: HeaderPayload) {
      return {
        authorization: payload.request.headers.get('authorization') as string,
        'x-request-id': payload.request.headers.get('x-request-id') as string,
      };
    },
  },

  genericAuth: {
    mode: 'protect-granular',
    resolveUserFn: (async (context: RequestContext) => {
      // First check for x-api-key specifically used by the frontend for payload-cms
      const apiKey = context.request.headers.get('x-api-key');
      if (apiKey) {
        return handleApiKeyAuth(context, apiKey);
      }

      // Check authorization header for mfa token
      const mfaToken = context.request.headers.get('x-mfa-token');
      if (mfaToken) {
        return handleMfaTokenAuth(context, mfaToken);
      }

      // Check authorization header
      const authHeader = context.request.headers.get('authorization');
      if (!authHeader) {
        return { isAuthenticated: false };
      }

      // Check if it contains Basic auth
      const basicAuthResult = handleBasicAuth(authHeader);
      if (basicAuthResult) {
        return basicAuthResult;
      }

      // Handle Bearer token
      const bearerAuthResult = handleBearerTokenAuth(context, authHeader);
      if (bearerAuthResult) {
        return bearerAuthResult;
      }

      return { isAuthenticated: false };
    }) as unknown as ResolveUserFn<Record<string, never>, Record<string, unknown>>,

    validateUser: ((params: ValidationParams) => {
      try {
        if (params.fieldDirectives?.authenticated && !params.user.isAuthenticated) {
          handleAuthError(
            new Error(ERROR_MESSAGES.AUTH_REQUIRED),
            ERROR_MESSAGES.AUTH_REQUIRED,
            ERROR_CODES.UNAUTHORIZED
          );
        }
      } catch (error) {
        handleAuthError(error, ERROR_MESSAGES.AUTH_REQUIRED, ERROR_CODES.UNAUTHORIZED);
      }
    }) as unknown as ValidateUserFn<Record<string, unknown>>,
  },
});
