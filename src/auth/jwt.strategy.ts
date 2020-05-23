import { Injectable, UnauthorizedException } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'SECRET_EXAMPLE',
        });
    }

    public async validate(payload: JwtPayload): Promise<User> {
        const {username } = payload;
        const user = await this.userRepository.findOne({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}
