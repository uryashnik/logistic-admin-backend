import { IsDefined, IsString } from 'class-validator';

export class IdEntryDto {
  @IsDefined()
  @IsString()
  id: string;
}
