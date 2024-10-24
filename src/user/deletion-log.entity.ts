import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('deletion_logs')
export class DeletionLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebookId: string;

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletionTime: Date;
}
