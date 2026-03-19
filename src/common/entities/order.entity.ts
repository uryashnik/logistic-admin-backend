import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatusType } from '../enums';
import { UserEntity } from './user.entity';
import { OrderHistoryEntity } from './order-history.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column()
  description: string;

  @Column({ name: 'tracking_number' })
  trackingNumber: string;

  @BeforeInsert()
  generateTrackingNumber() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    this.trackingNumber = `ORD-${dateStr}-${Math.floor(Math.random() * 10000)}`;
  }

  @Column({ name: 'estimated_cost', type: 'int' })
  estimatedCost: number;

  @Column({ name: 'pickup_address', nullable: false })
  pickupAddress: string;

  @Column({ name: 'delivery_address', nullable: false })
  deliveryAddress: string;

  @Column({ type: 'enum', enum: OrderStatusType, default: OrderStatusType.Created })
  status: OrderStatusType;

  @OneToMany(() => OrderHistoryEntity, (orderHistory) => orderHistory.order, { cascade: true })
  history: OrderHistoryEntity[];

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'deleted_by' })
  deletedBy: UserEntity;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', name: 'deleted_at' })
  deletedAt?: Date;
}
