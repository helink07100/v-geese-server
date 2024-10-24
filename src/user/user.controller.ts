import {
  Controller,
  Get,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取所有用户
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // 根据ID获取用户信息
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // 删除用户并记录删除状态
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUserByFacebookId(id);
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }

  // 根据Facebook用户ID查询删除状态
  @Get('deletion-status/:id')
  async getDeletionStatus(@Param('id') id: string) {
    const status = await this.userService.getDeletionStatus(id);
    if (!status) {
      return { message: 'User deletion status not found', status: 'NOT_FOUND' };
    }

    return {
      message: 'User deletion status found',
      status: status.deleted ? 'DELETED' : 'PENDING',
      deletionTime: status.deletionTime || null,
    };
  }
}
