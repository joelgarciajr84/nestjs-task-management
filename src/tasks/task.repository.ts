import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async createTask(createTaskDto: CreateTaskDTO): Promise<Task>{
        const task: Task = new Task();
        const { title, description } = createTaskDto;
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

}