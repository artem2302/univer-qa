import { ArrayNotEmpty, ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDepartmentDto {
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(20)
    @MinLength(5)
    @IsString()
    @IsOptional()
    abbreviation?: string;

    @IsMongoId({ each: true })
    @IsString({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    admins?: string[];

    @IsMongoId()
    @IsString()
    @IsOptional()
    faculty?: string;

    @IsMongoId({ each: true })
    @IsString({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    tutors?: string[];
}