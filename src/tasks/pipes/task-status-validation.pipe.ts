import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks-status-enum';

export class TaskValidationPipe implements PipeTransform{

    public readonly allowedStarues = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,

    ];

    public transform(value: any){
        if (!this.isStatusValid(value.toUpperCase())){
            throw new BadRequestException(`"${value}" is not a valid status`)
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStarues.indexOf(status);
        return index !== -1;
    }
}
