import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateGroupDto } from './dto/create-group.dto';
import { Group, IGroupModel } from './schemas/group.schema';

import { IUserModel, User, UserDocument } from 'src/users/schemas/user.schema';
import { Faculty, IFacultyModel } from 'src/faculties/schemas/faculty.schema';
import { TUserRole } from 'src/users/types';
import { GetGroupsDto } from './dto/get-groups.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
    constructor(
        @InjectModel(Group.name) private readonly groupModel: IGroupModel,
        @InjectModel(User.name) private readonly userModel: IUserModel,
        @InjectModel(Faculty.name) private readonly facultyModel: IFacultyModel,
    ) { }

    async create(body: CreateGroupDto, creator: UserDocument) {
        if (creator.role !== 'global-admin') {
            if (!body.faculty) {
                throw new BadRequestException('Faculty not defined');
            }

            const faculty = await this.facultyModel.findOne({ admins: creator._id, _id: body.faculty });
            if (!faculty) {
                throw new BadRequestException();
            }
        }

        if (body.admins) {
            const adminsCount = await this.userModel.countDocuments({ role: 'group-admin' as TUserRole, _id: { $in: body.admins } });
            if (adminsCount !== body.admins.length) {
                throw new BadRequestException('Some of admin accounts provided do not exist');
            }
        }

        if (body.students) {
            const studentsCount = await this.userModel.countDocuments({ role: 'student' as TUserRole, _id: { $in: body.students } });
            if (studentsCount !== body.admins.length) {
                throw new BadRequestException('Some of student accounts provided do not exist');
            }
        }

        return new this.groupModel(body).save();
    }

    async all(query: GetGroupsDto) {
        const [models, count] = await Promise.all([
            this.groupModel.find().skip(query.skip).limit(query.limit),
            this.groupModel.countDocuments()
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

    async update(id: string, body: UpdateGroupDto, updater: UserDocument) {
        const group = await this.groupModel.findById(id);
        if (!group) {
            throw new NotFoundException();
        }

        if (updater.role !== 'global-admin') {
            delete group.faculty;
            if (updater.role === 'faculty-admin') {
                const faculty = await this.facultyModel.findOne({ admins: updater._id, _id: group.faculty });
                if (!faculty) {
                    throw new BadRequestException();
                }
            }

            if (updater.role === 'group-admin') {
                if (!group.admins.map(x => x.toString()).includes(updater._id.toString())) {
                    throw new ForbiddenException();
                }
            }
        }

        if (body.admins) {
            const adminsCount = await this.userModel.countDocuments({ role: 'group-admin' as TUserRole, _id: { $in: body.admins } });
            if (adminsCount !== body.admins.length) {
                throw new BadRequestException('Some of admin accounts provided do not exist');
            }
        }

        if (body.students) {
            const studentsCount = await this.userModel.countDocuments({ role: 'student' as TUserRole, _id: { $in: body.students } });
            if (studentsCount !== body.admins.length) {
                throw new BadRequestException('Some of student accounts provided do not exist');
            }
        }

        return this.groupModel.findByIdAndUpdate(id, body, { new: true });
    }

    async remove(id: string, remover: UserDocument) {
        const faculty = await this.facultyModel.findById(id);
        if (!faculty) {
            throw new ForbiddenException();
        }
        if (remover.role !== 'global-admin') {
            if (!faculty.admins.map(x => x.toString()).includes(remover._id.toString())) {
                throw new ForbiddenException();
            }
        }
        return faculty;
    }
}
