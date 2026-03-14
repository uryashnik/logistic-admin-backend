import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from '../../common/entities/role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  isActive: boolean;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Roles is required' })
  roles: RoleEntity[];
}
