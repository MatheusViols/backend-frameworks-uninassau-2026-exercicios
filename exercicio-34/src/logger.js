const winston = require('winston');
require('winston-daily-rotate-file');

// TODO: Configurar transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  
  // File transport - All logs
  // new winston.transports.File({
  //   filename: 'logs/combined.log',
  //   maxsize: 5242880, // 5MB
  //   maxFiles: 5
  // }),
  
  // File transport - Errors only
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: 'error',
  //   maxsize: 5242880,
  //   maxFiles: 5
  // }),
  
  // Daily rotate file
  // new winston.transports.DailyRotateFile({
  //   filename: 'logs/application-%DATE%.log',
  //   datePattern: 'YYYY-MM-DD',
  //   maxSize: '20m',
  //   maxFiles: '14d'
  // })
];

// TODO: Criar logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports
});

module.exports = logger;
