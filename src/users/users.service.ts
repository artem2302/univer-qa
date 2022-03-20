import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import { IUserModel, User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: IUserModel) { }

    async createUser(body: CreateUserDto) {
        return new this.userModel(body).save();
    }
}
