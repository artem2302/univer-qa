import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';

import { UsersSeed } from './users.seed';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Faculty, FacultySchema } from 'src/faculties/schemas/faculty.schema';
import { FacultiesSeed } from './faculties.seed';

@Module({
    imports: [
        CommandModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            },
            {
                name: Faculty.name,
                schema: FacultySchema
            }
        ])
    ],
    providers: [UsersSeed, FacultiesSeed],
    exports: [UsersSeed, FacultiesSeed],
})
export class SeedsModule { }