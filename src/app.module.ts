import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TasksModule,
  ],
})
export class AppModule { }
