import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export default abstract class BaseEntity {
  @CreateDateColumn({ name:'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name:'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name:'deleted_at', type: 'timestamp', nullable: true, select:false })
  @Exclude()
  deletedAt: Date;

  @Column({default: false, select: false})
  @Exclude()
  deleted: boolean
}