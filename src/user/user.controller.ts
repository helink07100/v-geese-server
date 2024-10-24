import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 获取用户个人信息
  @Get('profile')
  async getUserProfile(@Query('accessToken') accessToken: string) {
    const userData = await this.userService.getUserProfile(accessToken);
    return userData;
  }
}
