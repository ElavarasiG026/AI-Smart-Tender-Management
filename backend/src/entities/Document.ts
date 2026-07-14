import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Vendor } from './Vendor';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column()
  fileType: string;

  @Column({ type: 'text' })
  fileUrl: string;

  @Column({ type: 'text', nullable: true })
  uploadedBy: string;

  @Column({ enum: ['pending', 'verified', 'rejected', 'duplicate'] })
  verificationStatus: string;

  @Column({ type: 'simple-json', nullable: true })
  aiAnalysis: any;

  @Column({ type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  vendorId: string;

  @Column({ nullable: true })
  submissionId: string;

  @Column({ nullable: true })
  tenderId: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Vendor, (vendor) => vendor.documents)
  vendor: Vendor;
}

export default Document;
