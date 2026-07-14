import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Submission } from './Submission';
import { Document } from './Document';
import { Contract } from './Contract';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column()
  registrationNumber: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ enum: ['pending', 'approved', 'rejected', 'suspended'] })
  status: string;

  @Column({ type: 'decimal', default: 0 })
  rating: number;

  @Column({ default: 0 })
  completedProjects: number;

  @Column({ type: 'simple-json', nullable: true })
  certifications: any[];

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.vendor)
  user: User;

  @OneToMany(() => Submission, (submission) => submission.vendor)
  submissions: Submission[];

  @OneToMany(() => Document, (document) => document.vendor)
  documents: Document[];

  @OneToMany(() => Contract, (contract) => contract.vendor)
  contracts: Contract[];
}

export default Vendor;
