import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}
    @Get()
    public getAllTasks(): Array<Task>{
        return this.taskService.getAllTasks();
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDTO){
       return this.taskService.createTask(createTaskDto);

    }

}
