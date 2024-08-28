import { HealthService } from './health.service';
import { HttpStatus } from '@nestjs/common';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  describe('checkApiHealth', () => {
    it('should return the health status of the API', () => {
      const expectedResult = {
        statusCode: HttpStatus.OK,
        message: 'Hello World!',
      };

      const result = service.checkApiHealth();

      expect(result).toEqual(expectedResult);
    });
  });
});
