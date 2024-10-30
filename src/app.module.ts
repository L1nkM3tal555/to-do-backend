import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { TaskEntity } from './tasks/task.entity';
import { DatabaseService } from './database.service';
import { UserTaskModule } from './user-task/user-task.module';

@Module({
  imports: [UsersModule, TasksModule, 
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todotasks',
      entities: [UserEntity, TaskEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }), UserTaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
