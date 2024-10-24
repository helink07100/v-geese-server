import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DeletionLog } from './deletion-log.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(DeletionLog)
    private readonly deletionLogRepository: Repository<DeletionLog>,
  ) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 根据Facebook ID查找单个用户
  async findOne(facebookId: string): Promise<User> {
    return this.userRepository.findOne({ where: { facebookId } });
  }

  // 创建或更新用户
  async createOrUpdateUser(
    facebookId: string,
    name: string,
    email: string,
    profilePicture: string,
    accessToken: string,
  ): Promise<User> {
    let user = await this.userRepository.findOne({ where: { facebookId } });

    if (!user) {
      user = this.userRepository.create({
        facebookId,
        name,
        email,
        profilePicture,
        accessToken,
      });
    } else {
      user.accessToken = accessToken;
    }

    return this.userRepository.save(user);
  }

  // 删除用户并记录删除日志
  async deleteUserByFacebookId(facebookId: string): Promise<any> {
    const deleteResult = await this.userRepository.delete({ facebookId });
    if (deleteResult.affected) {
      const deletionLog = this.deletionLogRepository.create({
        facebookId,
        deleted: true,
        deletionTime: new Date(),
      });
      await this.deletionLogRepository.save(deletionLog);
    }
    return deleteResult;
  }

  // 获取删除状态
  async getDeletionStatus(facebookId: string): Promise<DeletionLog> {
    return this.deletionLogRepository.findOne({ where: { facebookId } });
  }
}
