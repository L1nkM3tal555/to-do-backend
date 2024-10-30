import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async findOne(id: string): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findOne({where: {id}, relations: ["artworks", "exhibitions"] } );
        if (!user)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
   
        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.save(user);
    }
    
}
