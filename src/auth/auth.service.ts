import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository) {

    }

    public async signUp(authCredentialsDto: AuthCrendentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    public async signIn(authCredentialsDto: AuthCrendentialsDto): Promise<void> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

}
