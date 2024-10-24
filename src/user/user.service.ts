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

  async deleteUserByFacebookId(facebookId: string): Promise<void> {
    await this.userRepository.delete({ facebookId });
    const deletionLog = this.deletionLogRepository.create({
      facebookId,
      deleted: true,
      deletionTime: new Date(),
    });
    await this.deletionLogRepository.save(deletionLog);
  }

  async getDeletionStatus(facebookId: string): Promise<DeletionLog> {
    return this.deletionLogRepository.findOne({ where: { facebookId } });
  }
}
