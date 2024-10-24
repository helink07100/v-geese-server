import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'facebook_users',
  entities: [User], // 在此导入实体类
  synchronize: true, // 在开发环境中使用，生产环境中建议设置为 false
};

export default config;
