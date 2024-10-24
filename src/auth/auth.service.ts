import { Injectable } from '@nestjs/common';
import { FacebookService } from '../facebook/facebook.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly userService: UserService,
  ) {}

  async validateFacebookUser(accessToken: string, profile: any) {
    const facebookUserData = await this.facebookService.getFacebookUserData(
      accessToken,
      ['id', 'name', 'email', 'picture'],
    );
    return this.userService.createOrUpdateUser(
      profile.id,
      facebookUserData.name,
      facebookUserData.email,
      facebookUserData.picture?.data?.url,
      accessToken,
    );
  }
}
