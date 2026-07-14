import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Tender } from './Tender';
import { Vendor } from './Vendor';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contractNumber: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  contractDocument: string;

  @Column({ enum: ['draft', 'pending', 'signed', 'active', 'completed', 'terminated'] })
  status: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  contractValue: number;

  @Column({ type: 'text', nullable: true })
  terms: string;

  @Column({ type: 'simple-json', nullable: true })
  milestones: any[];

  @Column({ type: 'text', nullable: true })
  vendorSignature: string;

  @Column({ type: 'text', nullable: true })
  organizationSignature: string;

  @Column({ nullable: true })
  signedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Tender, (tender) => tender.contracts)
  tender: Tender;

  @ManyToOne(() => Vendor, (vendor) => vendor.contracts)
  vendor: Vendor;
}

export default Contract;
