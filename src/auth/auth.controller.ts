import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCrendentialsDto } from './dto/auth-credentials.dto';
import { AccessToken } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){

    }
    @Post('/signup')
    public async signUp(@Body(ValidationPipe) authCrendentialsDto: AuthCrendentialsDto ): Promise<void> {
        return this.authService.signUp(authCrendentialsDto);
    }

    @Post('/signin')
    public async signIn(@Body(ValidationPipe) authCrendentialsDto: AuthCrendentialsDto): Promise<AccessToken> {
        return this.authService.signIn(authCrendentialsDto);
    }
}
