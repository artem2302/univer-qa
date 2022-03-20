import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SeedsModule } from './seeds/seeds.module';
import { DepartmentsModule } from './departments/departments.module';
import { FacultiesModule } from './faculties/faculties.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot('mongodb://localhost/univer_qa'), SeedsModule, DepartmentsModule, FacultiesModule, GroupsModule], //TODO env
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }
