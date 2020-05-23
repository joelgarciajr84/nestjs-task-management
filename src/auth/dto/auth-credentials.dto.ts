import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import {PASSWORD_VALIDATOR, USERNAME_VALIDATOR } from '../auth-credentials.enum';
export class AuthCrendentialsDto {
    @IsString()
    @MinLength(USERNAME_VALIDATOR.MIN_LENGTH)
    @MaxLength(USERNAME_VALIDATOR.MAX_LENGTH)
    public username: string;

    @IsString()
    @MinLength(PASSWORD_VALIDATOR.MIN_LENGTH)
    @MaxLength(PASSWORD_VALIDATOR.MAX_LENGTH)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    public password: string;
}
