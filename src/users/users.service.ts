import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const user = await this.usersRepository.createQueryBuilder('users').where('users.id = :id', { id: 1 }).getOne();
    return user;
  }

  async findOne(id: number): Promise<UserEntity | null> {
    return await this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.roles', 'roles').where('users.id = :id', { id }).getOne();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.createQueryBuilder('users').where('users.email = :email', { email }).getOne();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
