// tslint:disable: comment-format

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './tasks-status-enum';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
    ) { }

    public async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    public async getTasks(
        filterDto: GetTasksFilterDto,
        user: User): Promise<Array<Task>> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    public async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        task.status = status;
        await task.save();
        return task;

    }

    public async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({id, userId:user.id});

        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }

}
