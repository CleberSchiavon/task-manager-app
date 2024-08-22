import { AuthModule } from "./auth/auth.module";
import { TaskModule } from "./task/task.module";
import { UsersModule } from "./users/users.module";
import { AuthController } from "./auth/auth.controller";
import { TaskController } from "./task/task.controller";
import { HealthController } from "./health/health.controller";
import { AuthService } from "./auth/auth.service";
import { TaskService } from "./task/task.service";
import { UsersService } from "./users/users.service";
import { HealthService } from "./health/health.service";


export {
    AuthModule,
    TaskModule,
    UsersModule,
    AuthController,
    TaskController,
    HealthController,
    AuthService,
    TaskService,
    UsersService,
    HealthService
}