import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks-status-enum';

export class GetTasksFilterDto {
    @ApiProperty()
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    public status: TaskStatus;

    @ApiProperty()
    @IsOptional()   
    @IsNotEmpty()
    public search: string;
}