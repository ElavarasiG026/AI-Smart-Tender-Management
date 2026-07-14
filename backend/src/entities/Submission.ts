import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Tender } from './Tender';
import { Vendor } from './Vendor';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenderId: string;

  @Column()
  vendorId: string;

  @Column({ enum: ['pending', 'submitted', 'evaluating', 'accepted', 'rejected', 'disqualified'] })
  status: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  quotedPrice: number;

  @Column({ type: 'text', nullable: true })
  proposalSummary: string;

  @Column({ type: 'simple-json', nullable: true })
  evaluationScore: any;

  @Column({ type: 'text', nullable: true })
  evaluationComments: string;

  @Column({ type: 'simple-json', nullable: true })
  aiAnalysis: any;

  @CreateDateColumn()
  submittedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Tender, (tender) => tender.submissions)
  tender: Tender;

  @ManyToOne(() => Vendor, (vendor) => vendor.submissions)
  vendor: Vendor;
}

export default Submission;
