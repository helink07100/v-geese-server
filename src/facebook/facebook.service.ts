import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookService {
  // 获取 Facebook 用户详细信息
  async getFacebookUserData(
    accessToken: string,
    fields: string[] = ['id', 'name', 'email'],
  ): Promise<any> {
    const url = `https://graph.facebook.com/me?fields=${fields.join(',')}&access_token=${accessToken}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data from Facebook');
    }
  }

  // 解析 Facebook 删除回调的 signed_request
  verifySignedRequest(signedRequest: string): { userId: string } {
    const [encodedSig, payload] = signedRequest.split('.', 2);
    const secret = process.env.FACEBOOK_APP_SECRET;
    const expectedSig = require('crypto')
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64');

    const sig = this.base64UrlDecode(encodedSig);

    if (sig !== expectedSig) {
      throw new Error('Invalid signed request signature');
    }

    const data = JSON.parse(this.base64UrlDecode(payload));
    return { userId: data.user_id };
  }

  private base64UrlDecode(input: string) {
    input = input.replace(/-/g, '+').replace(/_/g, '/');
    const buffer = Buffer.from(input, 'base64');
    return buffer.toString();
  }
}
