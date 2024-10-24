import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeletionLog } from './deletion-log.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // 导入UserController

@Module({
  imports: [TypeOrmModule.forFeature([User, DeletionLog])],
  providers: [UserService],
  controllers: [UserController], // 注册UserController
  exports: [UserService],
})
export class UserModule {}
