import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { UserService } from '../user/user.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'https://yourdomain.com/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'photos'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    const email = emails && emails.length ? emails[0].value : null;
    const profilePicture = photos && photos.length ? photos[0].value : null;

    // 保存或更新用户
    const user = await this.userService.createOrUpdateUser(
      id,
      displayName,
      email,
      profilePicture,
      accessToken,
    );

    done(null, user);
  }
}
