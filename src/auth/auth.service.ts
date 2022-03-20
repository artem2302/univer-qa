import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync } from 'bcrypt';

import { IUserModel, User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: IUserModel,
        private readonly jwtService: JwtService
    ) { }

    private readonly logger = new Logger(AuthService.name);

    async validateUser(login: string, password: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ login });
        if (user && compareSync(password, user.password)) {
            return user;
        }

        throw new UnauthorizedException();
    }

    async login(user: UserDocument) {
        const payload = { login: user.login, sub: user._id };
        return { token: this.jwtService.sign(payload) };
    }

}
