import { TaskEntity } from "src/tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nombre:string;
    @Column()
    password:string;
    @OneToMany(()=>TaskEntity, task => task.user, {cascade: true})
    tasks: TaskEntity[];
}
