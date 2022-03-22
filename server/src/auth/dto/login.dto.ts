import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    login: string;

    @MaxLength(20)
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string
}