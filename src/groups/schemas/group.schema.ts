import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';

import { Faculty } from 'src/faculties/schemas/faculty.schema';
import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, ref: User.name, default: [] })
    admins: MongooseSchema.Types.ObjectId[];

    @Prop({ required: true, ref: User.name, default: [] })
    students: MongooseSchema.Types.ObjectId[];

    @Prop({ required: true, ref: Faculty.name })
    faculty: MongooseSchema.Types.ObjectId;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
export type GroupDocument = Group & Document;
export interface IGroupModel extends Model<GroupDocument> { };

GroupSchema.index({ name: 'text' });