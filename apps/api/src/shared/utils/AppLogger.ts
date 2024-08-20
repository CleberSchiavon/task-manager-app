import { IAppLogger, LoggerReturn, LoggerTypes } from 'types/Http/Logger';
import chalk from 'chalk';

const LogError = chalk.redBright;
const LogSuccess = chalk.greenBright;
const LogInfo = chalk.cyan;

const logMessage = (prefix: string, apiReturn: string, message: string) => {
  console.log(
    `[${prefix}] [${apiReturn}] [${new Date().toISOString()}] ${message}`,
  );
};

export const AppLogger = ({
  type,
  logReturn,
  logMessage: message,
}: IAppLogger) => {
  let logFunction: (msg: string) => string;

  switch (logReturn) {
    case LoggerReturn.SUCCESS:
      logFunction = LogSuccess;
      break;
    case LoggerReturn.ERROR:
      logFunction = LogError;
      break;
    case LoggerReturn.REQUEST:
      logFunction = LogInfo;
      break;
    default:
      console.warn(`Unknown logReturn type: ${logReturn}`);
      return;
  }

  switch (type) {
    case LoggerTypes.SERVER:
      logMessage(LoggerTypes.SERVER, logReturn, logFunction(message));
      break;
    case LoggerTypes.INFO:
      logMessage(LoggerTypes.INFO, logReturn, logFunction(message));
      break;
    default:
      console.warn(`Unknown logger type: ${type}`);
  }
};
