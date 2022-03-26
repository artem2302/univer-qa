import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsNumberString, Max, Min } from 'class-validator';

export class GetAllDto {
    @Min(0)
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    skip: number;

    @Max(100)
    @Min(1)
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    limit: number;
}