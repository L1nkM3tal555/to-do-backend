import { UserEntity } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    estado:string;
    @Column()
    fechaInicio: string;
    @Column()
    fechaFin: string;
    @ManyToOne(() => UserEntity, user => user.tasks, {onDelete:'CASCADE'})
    user: UserEntity
}
