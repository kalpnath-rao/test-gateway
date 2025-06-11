import fs from 'fs';
import path from 'path';

export const requiredEnvVars = [
  'PORT',
  'PAYLOAD_CMS_ENDPOINT',
  'AUTH_SERVICE_ENDPOINT',
  'USER_SERVICE_ENDPOINT',
  'AUTH_TOKEN',
];

export const requiredFiles = ['jwt-private.pem'];

function validateFileExists(fileName: string): boolean {
  try {
    const filePath = path.join(process.cwd(), `secrets/${fileName}`);
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

export function validateEnvVariables() {
  // Check environment variables
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // Check required files
  const missingFiles = requiredFiles.filter(fileName => !validateFileExists(fileName));
  if (missingFiles.length > 0) {
    throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
  }
}
