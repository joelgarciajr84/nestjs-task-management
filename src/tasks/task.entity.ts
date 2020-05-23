import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './tasks-status-enum';

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public status: TaskStatus;

    @ManyToOne( type => User, user => user.tasks, { eager: false} )
    public user: User;

}
