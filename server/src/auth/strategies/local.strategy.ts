import { Injectable, Logger } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'login',
            passwordField: 'password'
        });
    }

    private readonly logger = new Logger(LocalStrategy.name);

    async validate(username: string, password: string): Promise<UserDocument> {
        return await this.authService.validateUser(username, password);
    }
}
