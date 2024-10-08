import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  TaskModule,
  UsersModule,
  HealthController,
  TaskController,
  HealthService,
  TaskService,
  AuthController,
  AuthService,
} from './modules';
import { HTTPLoggerInterceptor } from './middleware/http.logger.middleware';

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
      autoLoadEntities: true,
      logging: true,
    }),
    TaskModule,
    AuthModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController, HealthController, TaskController, AuthController],
  providers: [AppService, HealthService, TaskService, AuthService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HTTPLoggerInterceptor).forRoutes('*');
  }
}
