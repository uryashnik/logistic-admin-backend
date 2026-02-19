import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const user = await this.usersRepository.createQueryBuilder('users').where('users.id = :id', { id: 1 }).getOne();
    return user;
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.createQueryBuilder('users').where('users.id = :id', { id }).getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.createQueryBuilder('users').where('users.email = :email', { email }).getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
