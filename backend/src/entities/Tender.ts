import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from './User';
import { Submission } from './Submission';
import { Contract } from './Contract';

@Entity('tenders')
export class Tender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({ type: 'simple-json' })
  requiredDocuments: string[];

  @Column({ enum: ['draft', 'published', 'closed', 'cancelled'] })
  status: string;

  @Column()
  publishedDate: Date;

  @Column()
  deadline: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  budgetMin: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  budgetMax: number;

  @Column({ type: 'simple-json' })
  evaluationCriteria: any;

  @Column({ nullable: true })
  winnerVendorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tenders)
  createdBy: User;

  @OneToMany(() => Submission, (submission) => submission.tender)
  submissions: Submission[];

  @OneToMany(() => Contract, (contract) => contract.tender)
  contracts: Contract[];
}

export default Tender;
