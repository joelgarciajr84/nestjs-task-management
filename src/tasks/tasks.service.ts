import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskStatus } from './tasks.model';
@Injectable()
export class TasksService {

    private readonly tasks: Array<Task> = [];

    public getAllTasks(): Array<Task>{
        return this.tasks;
    }

    public createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        
        this.tasks.push(task);
        return task;
    }
}
