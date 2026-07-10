import { IsNotEmpty, IsString } from 'class-validator';

export class UrlDto {
  @IsNotEmpty()
  @IsString()
  originalUrl!: string;
}
