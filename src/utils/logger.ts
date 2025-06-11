import { createLogger, format, transports } from 'winston';
import { createLoggerFromWinston } from '@graphql-hive/winston';

// Create a Winston logger with enhanced request logging
const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize({ all: true }),
    format.printf(({ timestamp, message }) => {
      return `\x1b[36m[${timestamp}]\x1b[0m \x1b[33m${message}\x1b[0m`;
    })
  ),
  transports: [new transports.Console()],
});

// Export the Hive Gateway compatible logger
export const hiveLogger = createLoggerFromWinston(winstonLogger);
