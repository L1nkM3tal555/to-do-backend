import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { UserTaskService } from './user-task.service';
import { plainToInstance } from 'class-transformer';
import { TaskEntity } from 'src/tasks/task.entity';
import { TaskDto } from 'src/tasks/task.dto';


@Controller('user-task')
@UseInterceptors(BusinessErrorsInterceptor)
export class UserTaskController {
    constructor(private readonly userTaskService: UserTaskService){}

    @Post(':userId/tasks/:taskId')
    async addTaskUser(@Param('userId') userId: string, @Param('taskId') taskId: string){
        return await this.userTaskService.addTaskUser(userId, taskId);
    }

    @Get(':userId/tasks/:taskId')
    async findTaskByUserIdTaskId(@Param('userId') userId: string, @Param('taskId') taskId: string){
        return await this.userTaskService.findTaskByUserIdTaskId(userId, taskId);
    }

    @Get(':userId/tasks')
    async findTasksByUserId(@Param('userId') userId: string){
        return await this.userTaskService.findTasksByUserId(userId);
    }
    /*
    @Put(':userId/tasks')
    async associateTasksUser(@Body() tasksDto: TaskDto[], @Param('userId') userId: string){
        const tasks = plainToInstance(TaskEntity, tasksDto)
        return await this.userTaskService.associateTasksUser(userId, tasks);
    }*/

    @Delete(':userId/tasks/:taskId')
    @HttpCode(204)
    async deleteTaskUser(@Param('userId') userId: string, @Param('taskId') taskId: string){
        return await this.userTaskService.deleteTaskUser(userId, taskId);
    }

}
