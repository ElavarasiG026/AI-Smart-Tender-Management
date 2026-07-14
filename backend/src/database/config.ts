import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Tender } from '../entities/Tender';
import { Vendor } from '../entities/Vendor';
import { Submission } from '../entities/Submission';
import { Document } from '../entities/Document';
import { Contract } from '../entities/Contract';
import { Notification } from '../entities/Notification';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'tender_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Tender, Vendor, Submission, Document, Contract, Notification],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});
