import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Faculty, IFacultyModel } from 'src/faculties/schemas/faculty.schema';
import { IUserModel, User, UserDocument } from 'src/users/schemas/user.schema';
import { TUserRole } from 'src/users/types';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsDto } from './dto/get-departments.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, IDepartmentModel } from './schemas/department.schema';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectModel(Department.name) private readonly departmentModel: IDepartmentModel,
        @InjectModel(User.name) private readonly userModel: IUserModel,
        @InjectModel(Faculty.name) private readonly facultyModel: IFacultyModel,
    ) { }
    private readonly logger = new Logger(DepartmentsService.name);

    async create(body: CreateDepartmentDto, creator: UserDocument) {
        if (body.admins) {
            const adminsCount = await this.userModel.countDocuments({ _id: { $in: body.admins }, role: 'department-admin' as TUserRole });
            if (adminsCount !== body.admins.length) {
                throw new BadRequestException('Some of admin accounts provided do not exist');
            }
        }
        if (creator.role !== 'global-admin') {
            if (!body.faculty) {
                throw new BadRequestException('Faculty not defined');
            }
            const faculty = await this.facultyModel.findOne({ _id: body.faculty, admins: creator._id });
            if (!faculty) {
                throw new ForbiddenException();
            }
        }
        if (body.tutors) {
            const tutorsCount = await this.userModel.countDocuments({ role: 'tutor', _id: { $in: body.tutors } });
            if (tutorsCount !== body.tutors.length) {
                throw new BadRequestException('Some of tutor accounts provided do not exist');
            }
        }
        return new this.departmentModel(body).save();
    }

    async all(query: GetDepartmentsDto) {
        const mongoQuery: Record<string, any> = {};
        if (query.faculty) {
            mongoQuery.faculty = query.faculty;
        }
        const [models, count] = await Promise.all([
            this.departmentModel.find(mongoQuery).skip(query.skip).limit(query.limit),
            this.departmentModel.countDocuments(query)
        ]);

        if (!count) {
            throw new NotFoundException();
        }

        return { models, count };
    }

    async load(id: string) {
        const department = await this.departmentModel.findById(id);
        if (!department) {
            throw new NotFoundException();
        }
        return department;
    }

    async update(id: string, body: UpdateDepartmentDto, updater: UserDocument) {
        const department = await this.departmentModel.findById(id);
        if (department) {
            throw new NotFoundException();
        }
        if (updater.role !== 'global-admin') {
            if (updater.role === 'faculty-admin') {
                const faculty = await this.facultyModel.findOne({ _id: department.faculty, admins: updater._id });
                if (!faculty) {
                    throw new ForbiddenException();
                }
            }
            if (updater.role === 'department-admin') {
                delete body.faculty;
                delete body.admins;
                if (!department.admins.map(x => x.toString()).includes(updater._id.toString())) {
                    throw new ForbiddenException();
                }
            }
        }
        if (body.tutors) {
            const tutorsCount = await this.userModel.countDocuments({ role: 'tutor', _id: { $in: body.tutors } });
            if (tutorsCount !== body.tutors.length) {
                throw new BadRequestException('Some of tutor accounts provided do not exist');
            }
        }
        return await this.departmentModel.findByIdAndUpdate(id, body, { new: true });
    }

    async remove(id: string) {
        const department = await this.departmentModel.findById(id);
        if (!department) {
            throw new NotFoundException();
        }
        await department.remove();
    }
}
