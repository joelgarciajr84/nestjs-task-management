import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decotator';
import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(private readonly taskService: TasksService) { }

    @Get()
    public async getTasks(
        @Query(ValidationPipe) filterDTO: GetTasksFilterDto,
        @GetUser() user: User): Promise<Array<Task>> {
        return this.taskService.getTasks(filterDTO, user);
    }

    @Get('/:id')
    public async getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    public async createTask(
        @Body() createTaskDto: CreateTaskDTO,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto, user);
    }

    @Patch(':id/status')
    public async updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskValidationPipe) status: TaskStatus,
        @GetUser() user: User): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user);
    }
    @Delete('/:id')
    public async deleteTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
        ): Promise<void> {
        await this.taskService.deleteTask(id, user);
    }

}
