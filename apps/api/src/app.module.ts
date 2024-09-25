import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
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
