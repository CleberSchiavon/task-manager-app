import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './strategy';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicEndpoint = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicEndpoint) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authToken = this.extractTokenFromAuthorizationHeader(request);
    const jwtSecretKey = process.env.API_JWT_SECRET;

    console.log(authToken)
    console.log(jwtSecretKey)

    if (!authToken) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    try {
      const userPayload = await this.jwtService.verifyAsync(authToken, {
        secret: jwtSecretKey,
      });
      request.user = userPayload;
    } catch (error) {
      console.error('JWT verification error:', error);
      throw new UnauthorizedException('Invalid authorization token.');
    }

    return true;
  }

  private extractTokenFromAuthorizationHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    const [scheme, token] = authorizationHeader?.split(' ') ?? [];
    return scheme === 'Bearer' ? token : undefined;
  }
}