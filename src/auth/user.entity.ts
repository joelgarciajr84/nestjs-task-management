import * as bcrypt from 'bcrypt';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    public tasks: Array<Task>;

    public async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

}
