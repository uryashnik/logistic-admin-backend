import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatusType } from '../../common/enums';
import { UpdatedByDto } from '../../common/dto';

class OrderHistoryDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsString()
  carrier: string;

  @IsOptional()
  @IsString()
  addressFrom: string;

  @IsOptional()
  @IsString()
  addressTo: string;
}

export class UpdateOrderDto extends UpdatedByDto {
  @IsDefined()
  @IsEnum(OrderStatusType)
  status: OrderStatusType;

  @IsDefined()
  history: OrderHistoryDto;
}
