import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from '../common/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(OrderEntity) private readonly orderRepository: Repository<OrderEntity>) {}

  public async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  public async findAll() {
    return await this.orderRepository.createQueryBuilder('orders').take(10).getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
