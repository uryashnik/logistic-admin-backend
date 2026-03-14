import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../common/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}

  private getQueryBuilder() {
    return this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .leftJoinAndSelect('users.createdBy', 'createdBy')
      .leftJoinAndSelect('users.updatedBy', 'updatedBy');
  }

  public async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException(`User with email ${createUserDto.email} already exists`);
    }
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  public async findOne(id: number): Promise<UserEntity | null> {
    return await this.getQueryBuilder().where('users.id = :id', { id }).getOne();
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.createQueryBuilder('users').where('users.email = :email', { email }).getOne();
  }

  public async findAll() {
    return await this.getQueryBuilder().take(10).getMany();
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { roles, ...updateUserData } = updateUserDto;

    Object.assign(user, updateUserData);
    if (roles?.length) {
      user.roles = roles;
    }

    return await this.usersRepository.save(user);
  }

  public async remove(id: number, userId: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    Object.assign(user, { deletedBy: { id: userId }, deletedAt: new Date() });
    return this.usersRepository.save(user);
  }
}
