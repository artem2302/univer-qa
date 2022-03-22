import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GroupsService } from './groups.service';
import { UserDocument } from 'src/users/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetGroupsDto } from './dto/get-groups.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Roles('global-admin', 'faculty-admin')
  @Post()
  create(@Req() req: Request, @Body() body: CreateGroupDto) {
    return this.groupsService.create(body, req.user as UserDocument);
  }

  @Get()
  async all(@Query() query: GetGroupsDto, @Res() res: Response) {
    const { models, count } = await this.groupsService.all(query);
    return res.set('X-Total-Count', count.toString()).json(models);
  }

  @Get(':id')
  load(@Param('id') id: string) {
    return this.groupsService.load(id);
  }

  @Roles('global-admin', 'faculty-admin', 'group-admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateGroupDto, @Req() req: Request) {
    return this.groupsService.update(id, body, <UserDocument>req.user);
  }

  @Roles('global-admin', 'faculty-admin')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.groupsService.remove(id, <UserDocument>req.user);
  }

}
