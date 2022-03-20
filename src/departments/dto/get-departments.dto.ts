import { IsMongoId, IsOptional, IsString } from 'class-validator';

import { GetAllDto } from 'src/common/dto/get-all.dto';

export class GetDepartmentsDto extends GetAllDto {
    @IsMongoId()
    @IsString()
    @IsOptional()
    faculty: string;
}