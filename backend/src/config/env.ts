import dotenv from 'dotenv';

dotenv.config();

const requiredVars = ['DATABASE_URL', 'PORT', 'ALLOWED_ORIGINS', 'API_KEY'] as const;

type EnvVar = (typeof requiredVars)[number];

function getEnv(name: EnvVar): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  databaseUrl: getEnv('DATABASE_URL'),
  port: parseInt(getEnv('PORT'), 10),
  allowedOrigins: getEnv('ALLOWED_ORIGINS')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean),
  apiKey: getEnv('API_KEY'),
};
