import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository ){

    }
}
