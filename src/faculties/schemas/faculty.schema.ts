import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Document, Schema as MongooseSchema } from 'mongoose';

import { User } from 'src/users/schemas/user.schema';

@Schema()
export class Faculty {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    abbreviation: string;

    @Prop({ required: true, ref: User.name, default: [] })
    admins: MongooseSchema.Types.ObjectId[];
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);
export type FacultyDocument = Faculty & Document;
export interface IFacultyModel extends Model<FacultyDocument> { };

FacultySchema.index({ name: 'text' });
FacultySchema.index({ abbreviation: 'text' });