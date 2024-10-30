import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { UserTaskController } from './user-task.controller';
import { TaskEntity } from 'src/tasks/task.entity';
import { UserTaskService } from './user-task.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TaskEntity])],
  providers: [UserTaskService],
  controllers: [UserTaskController],
 })
export class UserTaskModule {}
