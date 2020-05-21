import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}
    @Get()
    public getAllTasks(): Array<Task>{
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post()
    public createTask(@Body() createTaskDto: CreateTaskDTO){
       return this.taskService.createTask(createTaskDto);

    }
    @Patch('/:id/status')
    public updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.taskService.updateTaskStatus(id, status);

    }
    @Delete('/:id')
    public deleteTaskById(@Param('id') id: string): void {
         this.taskService.deleteTaskById(id);
    }

}
