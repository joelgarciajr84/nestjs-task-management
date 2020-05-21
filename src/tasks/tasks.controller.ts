import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskService: TasksService){}
    @Get()
    public getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDto): Array<Task>{
        if(Object.keys(filterDTO).length) {
            return this.taskService.getTasksWithFilters(filterDTO);
        }else{
            return this.taskService.getAllTasks();

        }
    }

    @Get('/:id')
    public getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public createTask(@Body() createTaskDto: CreateTaskDTO){
       return this.taskService.createTask(createTaskDto);

    }
    @Patch('/:id/status')
    public updateTaskStatus(@Param('id') id: string, @Body('status', TaskValidationPipe) status: TaskStatus) {
        return this.taskService.updateTaskStatus(id, status);

    }
    @Delete('/:id')
    public deleteTaskById(@Param('id') id: string): void {
         this.taskService.deleteTaskById(id);
    }

}
