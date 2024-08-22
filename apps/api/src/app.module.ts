import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';
import { HTTPLoggerInterceptor } from './middleware/http.logger.middleware';
import { TaskModule } from './modules/task/task.module';
import { TaskController } from './modules/task/task.controller';
import { TaskService } from './modules/task/task.service';
import { TaskEntity } from './modules/task/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      entities: [TaskEntity],
      logging: true
    }),
    TaskModule,
  ],
  controllers: [AppController, HealthController, TaskController],
  providers: [AppService, HealthService, TaskService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerInterceptor).forRoutes('*');
  }
}