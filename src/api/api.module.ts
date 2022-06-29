import { AuthenticationService } from './auth/authentication.service';
import { LoginController } from './auth/login.controller';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
    GetTopUsersController
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AuthenticationService,
    JwtAuthGuard
  ]
})
export class ApiModule {}
