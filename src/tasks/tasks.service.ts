import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
@Injectable()
export class TasksService {

    private readonly tasks: Array<Task> = [];

    public getAllTasks(): Array<Task>{
        return this.tasks;
    }

    public createTask(createTaskDto: CreateTaskDTO): Task {
        const { title, description } = createTaskDto;
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
