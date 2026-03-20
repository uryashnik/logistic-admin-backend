import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatusType } from '../enums';
import { OrderEntity } from './order.entity';

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

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt?: Date;
}
