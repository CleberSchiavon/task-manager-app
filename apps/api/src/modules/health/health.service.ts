import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkApiHealth() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Hello World!',
    };
  }
}
