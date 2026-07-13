import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UrlDto {
  @IsNotEmpty()
  @IsString()
  originalUrl!: string;

  @IsOptional()
  @IsString()
  customUrl!: string;

  @IsNotEmpty()
  expiresIn!: string;

  @IsNotEmpty()
  isActive!: boolean;
}
