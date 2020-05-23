import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { USER_ERRORS } from './auth-credentials.enum';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async signUp(authCredentials: AuthCrendentialsDto): Promise<void>{
        const { username, password } = authCredentials;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
       
        try {
           await user.save();
        } catch (error) {
            if (error.code === USER_ERRORS.USERNAME_ALREADY_EXISTS) {
                throw new ConflictException('Username already taken');
            }else{
                throw new InternalServerErrorException();
            }
        }
        
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
