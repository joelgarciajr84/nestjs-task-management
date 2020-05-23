import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { AccessToken, JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
        ) {

    }

    public async signUp(authCredentialsDto: AuthCrendentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    public async signIn(authCredentialsDto: AuthCrendentialsDto): Promise<AccessToken> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);

        return {accessToken};
    }

}
