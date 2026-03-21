import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatusType } from '../enums';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('orders_history')
export class OrderHistoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => OrderEntity, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @Column({ nullable: true })
  carrier: string;

  @Column({ type: 'enum', enum: OrderStatusType })
  status: OrderStatusType;

  @Column({ nullable: true })
  comment: string;

  @Column({ name: 'address_from', nullable: true })
  addressFrom: string;

  @Column({ name: 'address_to', nullable: true })
  addressTo: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt?: Date;
}
