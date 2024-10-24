import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [FacebookService],
  controllers: [FacebookController],
})
export class FacebookModule {}
