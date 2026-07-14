import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Tender } from './Tender';
import { Vendor } from './Vendor';
import { Submission } from './Submission';
import { Notification } from './Notification';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ enum: ['admin', 'vendor', 'evaluator'] })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  organizationName: string;

  @Column({ type: 'text', nullable: true })
  profileImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Tender, (tender) => tender.createdBy)
  tenders: Tender[];

  @OneToMany(() => Vendor, (vendor) => vendor.user)
  vendor: Vendor[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}

export default User;
