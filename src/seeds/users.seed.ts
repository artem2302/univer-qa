import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Command } from 'nestjs-command';

import { IUserModel, User } from 'src/users/schemas/user.schema';
import { TUserRole } from 'src/users/types';

@Injectable()
export class UsersSeed {
    constructor(@InjectModel(User.name) private readonly userModel: IUserModel) { }

    private readonly logger = new Logger(UsersSeed.name);

    @Command({ command: 'seed:users', describe: 'Seed users' })
    async seed() {
        this.logger.log('Seeding users...');

        //TODO: other users;
        const admin = await new this.userModel({
            login: 'admin',
            password: 'admin',
            role: 'global-admin' as TUserRole
        }).save();

        this.logger.log('Seeding users done');
    }
}