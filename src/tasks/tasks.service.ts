// tslint:disable: comment-format

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks-status-enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository
    ){
        
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    public async createTask(createTaskDto: CreateTaskDTO): Promise<Task>{
        const task: Task = new Task();
        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }
    // private readonly tasks: Array<Task> = [];

    // public getAllTasks(): Array<Task>{
    //     return this.tasks;
    // }



    // public createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
        
    //     this.tasks.push(task);
    //     return task;
    // }
}
