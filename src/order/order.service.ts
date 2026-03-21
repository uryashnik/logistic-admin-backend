import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from '../common/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {}

  private getQueryBuilder() {
    return this.orderRepository.createQueryBuilder('orders');
  }

  public create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  public async findAll() {
    return await this.orderRepository.find({ take: 10, relations: ['history'] });
  }

  public async findOne(id: number) {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);

    return order;
  }

  public async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['history'] });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const { history, ...rest } = updateOrderDto;
    Object.assign(order, { ...rest, history: [...order.history, { ...history, status: rest.status, createdBy: rest.updatedBy }] });

    return this.orderRepository.save(order);
  }

  public async remove(id: number, userId: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    Object.assign(order, { deletedAt: new Date(), deletedBy: { id: userId } });

    return this.orderRepository.save(order);
  }
}
