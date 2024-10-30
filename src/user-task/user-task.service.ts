import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/tasks/task.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UserTaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly userRepository: Repository<UserEntity>,
    
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) {}

    async addTaskUser(userId: string, taskId: string): Promise<UserEntity> {
        const task: TaskEntity = await this.taskRepository.findOne({where: {id: taskId}});
        if (!task)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND);
      
        const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["tasks", "exhibitions"]})
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
    
        user.tasks = [...user.tasks, task];
        return await this.userRepository.save(user);
    }

    async findTaskByUserIdTaskId(userId: string, taskId: string): Promise<TaskEntity> {
        const task: TaskEntity = await this.taskRepository.findOne({where: {id: taskId}});
        if (!task)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND)
       
        const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["tasks"]});
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
   
        const userTask: TaskEntity = user.tasks.find(e => e.id === task.id);
   
        if (!userTask)
          throw new BusinessLogicException("The task with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)
   
        return userTask;
    }

    async findTasksByUserId(userId: string): Promise<TaskEntity[]> {
        const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["tasks"]});
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
       
        return user.tasks;
    }
    async deleteTaskUser(userId: string, taskId: string){
        const task: TaskEntity = await this.taskRepository.findOne({where: {id: taskId}});
        if (!task)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND)
    
        const user: UserEntity = await this.userRepository.findOne({where: {id: userId}, relations: ["tasks"]});
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND)
    
        const userTask: TaskEntity = user.tasks.find(e => e.id === task.id);
    
        if (!userTask)
            throw new BusinessLogicException("The task with the given id is not associated to the user", BusinessError.PRECONDITION_FAILED)
 
        user.tasks = user.tasks.filter(e => e.id !== taskId);
        await this.userRepository.save(user);
    }  

}
