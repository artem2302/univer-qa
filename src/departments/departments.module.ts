import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Faculty, FacultySchema } from 'src/faculties/schemas/faculty.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Department, DepartmentSchema } from './schemas/department.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Faculty.name,
      schema: FacultySchema
    },
    {
      name: User.name,
      schema: UserSchema
    },
    {
      name: Department.name,
      schema: DepartmentSchema
    }
  ]
  )],
  controllers: [DepartmentsController],
  providers: [DepartmentsService]
})
export class DepartmentsModule { }
