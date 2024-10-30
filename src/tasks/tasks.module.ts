import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController]
})
export class TasksModule {}
