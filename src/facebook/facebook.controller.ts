import { Controller, Post, Body, HttpCode, Get, Query } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { UserService } from '../user/user.service';

@Controller('facebook')
export class FacebookController {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly userService: UserService,
  ) {}

  @Post('deletion-callback')
  @HttpCode(200)
  async handleDeletionCallback(@Body('signed_request') signedRequest: string) {
    const { userId } = this.facebookService.verifySignedRequest(signedRequest);

    // 根据用户ID删除用户数据并记录删除日志
    await this.userService.deleteUserByFacebookId(userId);

    // 返回删除状态的追踪链接和确认码
    return {
      url: `https://fb.v-geese.com/facebook/deletion-status?id=${userId}`,
      confirmation_code: userId,
    };
  }

  @Get('deletion-status')
  async getDeletionStatus(@Query('id') userId: string) {
    const status = await this.userService.getDeletionStatus(userId);
    if (!status) {
      return { message: 'User deletion not found', status: 'NOT_FOUND' };
    }

    return {
      message: 'User deletion found',
      status: status.deleted ? 'DELETED' : 'PENDING',
      deletionTime: status.deletionTime || null,
    };
  }
}
