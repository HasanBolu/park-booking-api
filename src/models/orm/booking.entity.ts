import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import User from './user.entity';
import ParkingSpot from './parking-spot.entity';
import BaseEntity from './base.entity';

@Entity()
export default class Booking extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name:'start_date', nullable: false })
  startDate: Date;

  @Column({ name:'end_date', nullable: false })
  endDate: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_user_id' })
  createdByUser: User;

  @Column({ name:'created_by_user_id', nullable: false })
  createdByUserId: number;

  @ManyToOne(() => ParkingSpot)
  @JoinColumn({ name: 'parking_spot_id' })
  parkingSpot: ParkingSpot;

  @Column({ name:'parking_spot_id', nullable: false })
  parkingSpotId: number;
  
}