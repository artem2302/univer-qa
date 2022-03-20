import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FacultiesService } from './faculties.service';
import { FacultiesController } from './faculties.controller';
import { Faculty, FacultySchema } from './schemas/faculty.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Faculty.name,
        schema: FacultySchema
      },
      {
        name: User.name,
        schema: UserSchema
      }])
  ],
  controllers: [FacultiesController],
  providers: [FacultiesService]
})
export class FacultiesModule { }
