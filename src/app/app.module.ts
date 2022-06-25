import { AuthenticationService } from '@auth/authentication.service';
import { LoginController } from '@auth/login.controller';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';

import { HealthController } from './controllers/health.controller';
import { DeleteUserController } from './controllers/user/delete-user.controller';
import { EditUserController } from './controllers/user/edit-user.controller';
import { RegisterUserController } from './controllers/user/register-user.controller';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: 'SuperSecret',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
  ],
  controllers: [
    HealthController,
    LoginController,
    RegisterUserController,
    EditUserController,
    DeleteUserController,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthenticationService,
    JwtAuthGuard,
  ],
})
export class AppModule {}
