import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { AppLogger } from 'shared/utils/AppLogger';
import { LoggerReturn, LoggerTypes } from 'types/Http/Logger';

@Injectable()
export class HTTPLoggerInterceptor implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, baseUrl: url, body } = request;
    const userAgent = request.get('user-agent') || '';
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      AppLogger({
        type: LoggerTypes.INFO,
        logReturn: LoggerReturn.REQUEST,
        logMessage: `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} BODY - ${JSON.stringify(
          body,
        )}`,
      });
    });

    next();
  }
}