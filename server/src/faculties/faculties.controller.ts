import { Body, Controller, Get, Post, Query, Req, UseGuards, Res, Param, Put, Delete } from '@nestjs/common';
import { Request, Response } from 'express';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDocument } from 'src/users/schemas/user.schema';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { GetFacultiesDto } from './dto/get-faculties.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { FacultiesService } from './faculties.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) { }

  @Roles('global-admin')
  @Post()
  create(@Body() body: CreateFacultyDto) {
    return this.facultiesService.create(body);
  }

  @Get()
  async all(@Query() query: GetFacultiesDto, @Res() res: Response) {
    const { models, count } = await this.facultiesService.all(query);
    return res.set('X-Total-Count', count.toString()).json(models);
  }

  @Get(':id')
  load(@Param('id') id: string) {
    return this.facultiesService.load(id);
  }

  @Roles('faculty-admin', 'global-admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateFacultyDto, @Req() req: Request) {
    return this.facultiesService.update(id, body, <UserDocument>req.user);
  }

  @Roles('global-admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultiesService.remove(id);
  }
}
