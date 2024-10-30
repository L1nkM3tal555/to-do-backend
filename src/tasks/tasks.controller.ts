import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './task.dto';
import { TaskEntity } from './task.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('tasks')
@UseInterceptors(BusinessErrorsInterceptor)
export class TasksController {
    constructor(private readonly taskService: TasksService) {}

    @Post()
    async create(@Body() taskDto: TaskDto) {
    const task: TaskEntity = plainToInstance(TaskEntity, taskDto);
    return await this.taskService.create(task);
    }

    @Get(':taskId')
    async findOne(@Param('taskId') taskId: string) {
        return await this.taskService.findOne(taskId);
    }

    @Delete(':taskId')
    @HttpCode(204)
    async delete(@Param('taskId') taskId: string) {
        return await this.taskService.delete(taskId);
    }
}
