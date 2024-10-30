import { Injectable } from '@nestjs/common';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ){}

    async create(task: TaskEntity): Promise<TaskEntity> {
        const fechaInicio = task.fechaInicio;
        const fechaFin = task.fechaFin;
        const [diaI, mesI, anioI] = fechaInicio.split("-").map(Number);
        const [diaF, mesF, anioF] = fechaFin.split("-").map(Number);
        const fechaInicioDate = new Date(anioI, mesI - 1, diaI);
        const fechaFinDate = new Date(anioF, mesF - 1, diaF);
        //Verificación fecha
        if (fechaFinDate > fechaInicioDate && fechaFinDate !== fechaInicioDate){
            return await this.taskRepository.save(task);
        }
        
    }

    async findOne(id: string): Promise<TaskEntity> {
        const task: TaskEntity = await this.taskRepository.findOne({where: {id}, relations: ["user"] } );
        if (!task)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND);
   
        return task;
    }

    async update(id: string, task: TaskEntity): Promise<TaskEntity> {
        const persistedTask: TaskEntity = await this.taskRepository.findOne({where:{id}});
        if (!persistedTask)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND);
        
        return await this.taskRepository.save({...persistedTask, ...task});
    }

    async delete(id: string) {
        const task: TaskEntity = await this.taskRepository.findOne({where:{id}});
        if (!task)
          throw new BusinessLogicException("The task with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.taskRepository.remove(task);
    }
}
