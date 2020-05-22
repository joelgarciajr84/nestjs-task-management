import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status-enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(filterDto: GetTasksFilterDto): Promise<Array<Task>>{
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        if(status){
            query.andWhere('task.status = :status', {status});
        }

        if (search){
            query.andWhere('(task.title LIKE :search OR task.description LIKE  :search)', { search:`%${search}%` });
        }

        const tasks = await query.getMany();

        return tasks;
    }

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