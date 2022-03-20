import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDocument } from 'src/users/schemas/user.schema';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { GetDepartmentsDto } from './dto/get-departments.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Roles('global-admin', 'faculty-admin')
  @Post()
  create(@Body() body: CreateDepartmentDto, @Req() req: Request) {
    return this.departmentsService.create(body, <UserDocument>req.user);
  }

  @Get()
  async all(@Query() query: GetDepartmentsDto, @Res() res: Response) {
    const data = await this.departmentsService.all(query);
    return res.set('X-Total-Count', data.count.toString()).json(data);
  }

  @Get(':id')
  async load(@Param('id') id: string) {
    return this.departmentsService.load(id);
  }

  @Roles('global-admin', 'faculty-admin', 'department-admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDepartmentDto, @Req() req: Request) {
    return this.departmentsService.update(id, body, <UserDocument>req.user);
  }

  @Roles('global-admin', 'faculty-admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
