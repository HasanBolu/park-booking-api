import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseEntity from './base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export default class User extends BaseEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name:'first_name', nullable: false })
    firstName: string;

    @Column({ name:'last_name', nullable: false })
    lastName: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    role: string;

    @Column({ nullable: false })
    @Exclude()
    token: string;
}