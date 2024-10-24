import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FacebookStrategy } from './facebook.strategy';
import { UserModule } from '../user/user.module';
import { FacebookService } from '../facebook/facebook.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'facebook' }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, FacebookService, FacebookStrategy],
})
export class AuthModule {}
