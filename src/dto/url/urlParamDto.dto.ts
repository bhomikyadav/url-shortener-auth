import { IsAlphanumeric, IsNotEmpty, IsString } from 'class-validator';

export class UrlParamDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  id!: string;
}
