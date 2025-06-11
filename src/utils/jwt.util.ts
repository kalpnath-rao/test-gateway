import { readFileSync } from 'fs';
import { resolve } from 'path';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN, JWT_OPTIONS } from '../constants/constants';
import { ERROR_MESSAGES, JWT_ERROR_CODES } from '../constants/errors';

interface TokenPayload {
  tid: string;
  typ: string;
  aid: string;
}

function formatError(err: Error): never {
  if (err.message === ERROR_MESSAGES.TOKEN_EXPIRED) {
    throw new Error(JWT_ERROR_CODES.SESSION_EXPIRED);
  } else {
    throw new Error(JWT_ERROR_CODES.INVALID_TOKEN);
  }
}

const pvtKey = readFileSync(resolve(process.cwd(), 'secrets/jwt-private.pem'), 'utf8');

export const genAccessToken = (payload: TokenPayload): string => {
  try {
    const token = jwt.sign(payload, pvtKey, {
      expiresIn: JWT_OPTIONS.EXPIRES_IN, // 1 hour
      subject: JWT_OPTIONS.SUBJECT,
      algorithm: JWT_OPTIONS.ALGORITHM,
      audience: JWT_OPTIONS.AUDIENCE,
      issuer: JWT_OPTIONS.ISSUER,
    });
    return token;
  } catch (err) {
    if (err instanceof Error) {
      formatError(err);
    }
    throw err;
  }
};

export const verifyAuthToken = (jwtString: string): jwt.JwtPayload => {
  try {
    const artifacts = jwt.decode(jwtString);
    if (!artifacts || typeof artifacts === 'string') {
      throw new Error(JWT_ERROR_CODES.INVALID_TOKEN);
    }
    if (!AUTH_TOKEN) {
      throw new Error(JWT_ERROR_CODES.INVALID_TOKEN);
    }
    jwt.verify(jwtString, AUTH_TOKEN);
    return artifacts;
  } catch (err) {
    if (err instanceof Error) {
      formatError(err);
    }
    throw err;
  }
};
