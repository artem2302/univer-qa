import { ArrayNotEmpty, ArrayUnique, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFacultyDto {
    @MaxLength(100)
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(20)
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    abbreviation: string;

    @IsMongoId({ each: true })
    @IsString({ each: true })
    @ArrayUnique()
    @ArrayNotEmpty()
    @IsArray()
    @IsOptional()
    admins: string[];
}