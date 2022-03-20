import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class GetAllDto {
    @Min(0)
    @IsNumber()
    @IsNotEmpty()
    skip: number;

    @Max(100)
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    limit: number;
}