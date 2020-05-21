// tslint:disable: comment-format
import { Body, Controller, Get, Param, Post, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}

    @Get('/:id')
    public async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.taskService.createTask(createTaskDto);
    }

}
