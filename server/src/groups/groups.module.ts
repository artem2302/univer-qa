import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group, GroupSchema } from './schemas/group.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Faculty, FacultySchema } from 'src/faculties/schemas/faculty.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Group.name,
      schema: GroupSchema
    },
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name: Faculty.name,
      schema: FacultySchema
    }
  ])],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule { }
