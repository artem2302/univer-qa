import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { hashSync } from 'bcrypt';

import { TUserRole, USER_ROLES } from '../types';


@Schema()
export class User {
    @Prop({ required: true, trim: true, unique: true })
    login: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: USER_ROLES })
    role: TUserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
export interface IUserModel extends Model<UserDocument> { };

UserSchema.pre<UserDocument>('save', function (next) {
    if (this.isModified('password')) {
        this.password = hashSync(this.password, 10);
    }
    next();
});

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete (obj as UserDocument).password;
    return obj;
}