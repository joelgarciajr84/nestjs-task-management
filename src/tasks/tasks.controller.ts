// tslint:disable: comment-format
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
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

    @Patch(':id/status')
    public async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskValidationPipe)): Promise<Task> {
            return this.taskService.updateTaskStatus(id, status)
    }
    @Delete('/:id')
    public async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
         await this.taskService.deleteTask(id);
    }

}
