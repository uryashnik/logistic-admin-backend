import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  estimatedCost: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  pickupAddress: string;

  @IsString()
  @IsNotEmpty()
  deliveryAddress: string;
}
