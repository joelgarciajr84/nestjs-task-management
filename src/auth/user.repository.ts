import { EntityRepository, Repository } from 'typeorm';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async signUp(authCredentials: AuthCrendentialsDto): Promise<void>{
        const { username, password } = authCredentials;
        const user = new User();
        user.username = username;
        user.password = password;

        await user.save();
    }
}
