import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/apps/auth/strategies/jwt.strategy';
import { UserModule } from 'src/main/user/user.module';

import { HealthController } from './apps/controllers/health.controller';
import { DatabaseModule } from './config/database/database.module';

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
  controllers: [HealthController],
  providers: [JwtStrategy],
})
export class AppModule {}
