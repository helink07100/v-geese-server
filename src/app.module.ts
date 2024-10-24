import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FacebookModule } from './facebook/facebook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    UserModule,
    FacebookModule,
  ],
})
export class AppModule {}
