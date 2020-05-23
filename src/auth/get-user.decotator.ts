import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// tslint:disable-next-line: variable-name
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});
