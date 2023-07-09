import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatedescriptionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  description: string;
}
