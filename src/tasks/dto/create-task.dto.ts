import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
    @ApiProperty()
    @IsNotEmpty()
    public title: string;

    @ApiProperty()
    @IsNotEmpty()
    public description: string;
}
