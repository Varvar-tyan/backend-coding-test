import winston from 'winston';

enum LoggerLevel {
  INFO = 'info',
  ERROR = 'error'
}

const getFilename = (level: LoggerLevel): string => `logs/${level}.log`;

const logger = winston.createLogger({
  level: LoggerLevel.INFO,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: getFilename(LoggerLevel.ERROR), level: LoggerLevel.ERROR}),
    new winston.transports.File({filename: getFilename(LoggerLevel.INFO), level: LoggerLevel.INFO}),
  ],
});

export default logger;
