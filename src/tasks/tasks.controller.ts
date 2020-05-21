// tslint:disable: comment-format
import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
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
    public async createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task>{
        return this.taskService.createTask(createTaskDto);
    }

    // @Delete('/:id')
    // public deleteTaskById(@Param('id') id: string): void {
    //      this.taskService.deleteTaskById(id);
    // }

}
