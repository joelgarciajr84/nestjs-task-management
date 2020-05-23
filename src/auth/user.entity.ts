import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
 
@PrimaryGeneratedColumn()
 public id: number;

 @Column()
 public username: string;

 @Column()
 public password: string;

}
