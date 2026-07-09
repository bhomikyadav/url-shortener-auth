import { IsOptional } from 'class-validator';
import { UserDto } from './userDto.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

// this will exclude the password from this PartialUserDto
export class PartialUserDto extends PartialType(
  OmitType(UserDto, ['password'] as const),
) {
  @IsOptional()
  _id?: string;

  @IsOptional()
  refreshToken?: string;
}
