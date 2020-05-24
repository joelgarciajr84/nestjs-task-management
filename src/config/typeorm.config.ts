import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.TASK_MANAGEMENT_HOSTNAME,
    port: Number(process.env.TASK_MANAGEMENT_DB_PORT),
    username: process.env.TASK_MANAGEMENT_DB_USERNAME,
    password: process.env.TASK_MANAGEMENT_DB_PASSWORD,
    database: process.env.TASK_MANAGEMENT_DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: Boolean(process.env.TASK_MANAGEMENT_TYPEORM_SYNC),
};
