import { AuthenticationService } from '@auth/authentication.service';
import { LoginController } from '@auth/login.controller';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@user/user.module';

import { HealthController } from './controllers/health.controller';
import { DatabaseModule } from './database/database.module';

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
  controllers: [HealthController, LoginController],
  providers: [JwtStrategy, AuthenticationService],
})
export class AppModule {}
