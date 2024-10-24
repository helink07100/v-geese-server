import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './facebook.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'facebook' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FacebookStrategy],
})
export class AuthModule {}
