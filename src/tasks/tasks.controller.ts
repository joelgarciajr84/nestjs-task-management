import { Controller, Get, Post, Body } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}
    @Get()
    public getAllTasks(): Array<Task>{
        return this.taskService.getAllTasks();
    }

    @Post()
    public createTask(
        @Body('title') title: string,
        @Body('description') description: string,

    ){
       return this.taskService.createTask(title, description);

    }

}
