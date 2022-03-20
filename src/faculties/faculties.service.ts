import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { TUserRole } from 'src/users/types';
import { IUserModel, User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { GetFacultiesDto } from './dto/get-faculties.dto';
import { Faculty, IFacultyModel } from './schemas/faculty.schema';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultiesService {
    constructor(
        @InjectModel(Faculty.name) private readonly facultyModel: IFacultyModel,
        @InjectModel(User.name) private readonly userModel: IUserModel,
    ) { }
    private readonly logger = new Logger(FacultiesService.name);

    async create(body: CreateFacultyDto) {
        if (body.admins) {
            const adminsCount = await this.userModel.countDocuments({ _id: { $in: body.admins }, role: 'faculty-admin' as TUserRole });
            if (adminsCount !== body.admins.length) {
                throw new BadRequestException('Some of admin accounts provided do not exist');
            }
        }
        return new this.facultyModel(body).save();
    }

    async all(query: GetFacultiesDto) {
        const [models, count] = await Promise.all([
            this.facultyModel.find().skip(query.skip).limit(query.limit),
            this.facultyModel.countDocuments()
        ]);

        if (!count) {
            throw new NotFoundException();
        }

        return { models, count };
    }

    async load(id: string) {
        const faculty = await this.facultyModel.findById(id);
        if (!faculty) {
            throw new NotFoundException();
        }
        return faculty;
    }

    async update(id: string, body: UpdateFacultyDto, updater: UserDocument) {
        const faculty = await this.facultyModel.findById(id);
        if (updater.role !== 'global-admin') {
            if (!faculty.admins.map(x => x.toString()).includes(updater._id.toString())) {
                throw new ForbiddenException();
            }
        }

        if (body.admins) {
            const adminsCount = await this.userModel.countDocuments({ _id: { $in: body.admins }, role: 'faculty-admin' as TUserRole });
            if (adminsCount !== body.admins.length) {
                throw new BadRequestException('Some of admin accounts provided do not exist');
            }
        }

        return this.facultyModel.findByIdAndUpdate(id, body, { new: true });
    }

    async remove(id: string) {
        const faculty = await this.facultyModel.findById(id);
        if (!faculty) {
            throw new NotFoundException();
        }
        await faculty.remove();
    }

}
