import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthReturnType } from 'types/Health';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}
  @ApiTags('Health')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Caso receba o statusCode 200, a API está ativa!',
    type: HealthReturnType,
  })
  @Get('')
  checkApiHealth() {
    return this.healthService.checkApiHealth();
  }
}
