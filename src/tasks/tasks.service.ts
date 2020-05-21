import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './tasks.model';
@Injectable()
export class TasksService {

    private tasks: Array<Task> = [];

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

    public getAllTasks(): Array<Task>{
        return this.tasks;
    }

    public getTasksWithFilters(filterdto: GetTasksFilterDto): Array<Task>{
        const {status, search} = filterdto;
        
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }

        return tasks;
    }

    public getTaskById(id: string): Task {
        return this.tasks.find((task) => task.id === id);
    }

    public updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    public deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id )
    }


}
