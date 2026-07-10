import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocumentation } from '../../schema/user.schema';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user/userDto.dto';
import { PartialUserDto } from 'src/dto/user/particalDto.dto';

type optionT = {
  limit?: number | undefined;
  page?: number | undefined;
  sort?: string | undefined;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<User>,
  ) {}
  async createUser(userDto: UserDto) {
    return await this.UserModel.create(userDto);
  }

  /**  Find User  */
  async findUser(query: PartialUserDto, options: optionT) {
    console.log('🚀 users.service.ts:32 -> query', query);
    const { limit = 10, page = 0, sort } = options;
    const queryBuilder = this.UserModel.find(query);
    if (limit && page) queryBuilder.limit(limit).skip(page * limit);
    if (sort) queryBuilder.sort(sort);
    return await queryBuilder;
  }

  async update(query: PartialUserDto, updatedUser: PartialUserDto) {
    const updateUser = await this.UserModel.updateMany(query, {
      $set: updatedUser,
    });

    if (updateUser.matchedCount === 0) throw new InternalServerErrorException();
  }
}
