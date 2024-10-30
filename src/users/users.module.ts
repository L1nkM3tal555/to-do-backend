import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController]
})
export class UsersModule {}
