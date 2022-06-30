import { AuthenticationService } from './auth/authentication.service';
import { LoginController } from './auth/login.controller';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '../main/schedule.module';
import { UserModule } from '../main/user.module';

import { HealthController } from './controllers/health.controller';
import { CreateScheduleController } from './controllers/schedule/create-schedule.controller';
import { DeleteScheduleController } from './controllers/schedule/delete-schedule.controller';
import { EditScheduleController } from './controllers/schedule/edit-schedule.controller';
import { DeleteUserController } from './controllers/user/delete-user.controller';
import { EditUserController } from './controllers/user/edit-user.controller';
import { RegisterUserController } from './controllers/user/register-user.controller';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetSchedulesByUseridController } from './controllers/schedule/get-schedules-by-userid.controller';
import { GetTopUsersController } from './controllers/user/get-top-users.controller';
import { ScheduleNotFoundException } from '@api/exceptions/schedule-not-found.exception';
import { UserNotFoundException } from '@api/exceptions/user-not-found.exception';
import { SchedulesAlreadyExistsException } from '@api/exceptions/schedules-already-exists.exception';
import { GetUsersController } from '@api/controllers/user/get-users.controller';
import { UserAlreadyExistsException } from '@api/exceptions/user-already-exists.exception';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'SuperSecret',
      signOptions: { expiresIn: '1d' }
    }),
    UserModule,
    ScheduleModule
  ],
  controllers: [
    HealthController,
    LoginController,
    RegisterUserController,
    EditUserController,
    DeleteUserController,
    CreateScheduleController,
    EditScheduleController,
    DeleteScheduleController,
    GetSchedulesByUseridController,
    GetTopUsersController,
    GetUsersController
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_FILTER,
      useClass: ScheduleNotFoundException
    },
    {
      provide: APP_FILTER,
      useClass: UserNotFoundException
    },
    {
      provide: APP_FILTER,
      useClass: SchedulesAlreadyExistsException
    },
    {
      provide: APP_FILTER,
      useClass: UserAlreadyExistsException
    },
    AuthenticationService,
    JwtAuthGuard
  ]
})
export class ApiModule {}
