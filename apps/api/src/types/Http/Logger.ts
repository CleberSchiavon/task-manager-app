export enum LoggerTypes {
  SERVER = 'SERVER',
  INFO = 'INFO',
}

export enum LoggerReturn {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  REQUEST = 'REQUEST',
}

export interface IAppLogger {
  type: LoggerTypes;
  logReturn: LoggerReturn;
  logMessage: string;
}
