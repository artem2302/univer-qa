import { ArrayNotEmpty, ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGroupDto {
    @MaxLength(20)
    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsMongoId({ each: true })
    @IsString({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    admins?: string[];

    @IsMongoId({ each: true })
    @IsString({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    students?: string;

    @IsMongoId()
    @IsString()
    @IsOptional()
    faculty?: string;
}
