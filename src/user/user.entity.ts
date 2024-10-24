import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user') // 表名为 'user'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebookId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
