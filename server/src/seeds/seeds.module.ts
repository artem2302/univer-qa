import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';

import { UsersSeed } from './users.seed';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
    imports: [
        CommandModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ])
    ],
    providers: [UsersSeed],
    exports: [UsersSeed],
})
export class SeedsModule { }