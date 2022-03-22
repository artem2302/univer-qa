import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Model } from 'mongoose';

import { Faculty } from 'src/faculties/schemas/faculty.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Department {
    @Prop({ required: true })
    name: string;

    @Prop()
    abbreviation?: string;

    @Prop({ required: true, default: [], ref: User.name })
    admins: MongooseSchema.Types.ObjectId[];

    @Prop({ required: true, ref: Faculty.name })
    faculty: MongooseSchema.Types.ObjectId;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
export type DepartmentDocument = Department & Document;
export interface IDepartmentModel extends Model<DepartmentDocument> { };

DepartmentSchema.index({ name: 'text' });
DepartmentSchema.index({ faculty: 1 });
DepartmentSchema.index({ role: 1 });