import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
    public status: TaskStatus;
    public search: string;
}