import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { TUserRole, USER_ROLES } from '../types';

export class CreateUserDto {
    @MaxLength(50)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    login: string;

    @MaxLength(50)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(USER_ROLES)
    @IsString()
    @IsNotEmpty()
    role: TUserRole;
}