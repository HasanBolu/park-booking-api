import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from './base.entity';

@Entity()
export default class ParkingSpot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}