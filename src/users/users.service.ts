import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDTO } from './dto/LoginDTO'
import { PrismaService } from '../database/Database'
import { JwtService } from '@nestjs/jwt'
import { IRegistrationDTO } from './dto/IRegistrationDTO'

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    async loginAsync(requestData: LoginDTO) {
        const { login, password } = requestData

        const user = await this.prisma.user.findUnique({
            where: {
                login: login,
                password: password,
            },
        })

        if (!user) {
            throw new UnauthorizedException({
                displayMessage: 'Неверный логин или пароль',
            })
        }

        return {
            accessToken: await this.jwt.signAsync(
                {
                    id: user.id,
                    login: user.login,
                    role: user.role,
                    expiredAt: new Date().getDate() + 1,
                },
                { secret: 'secret', expiresIn: '1d' },
            ),
        }
    }

    async registrationAsync({ login, password }: IRegistrationDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                login: login,
            },
        })

        if (user) {
            throw new UnauthorizedException({
                displayMessage: 'Пользователь с таким логином уже есть',
            })
        }

        await this.prisma.user.create({
            data: {
                login: login,
                password: password,
            },
        })
    }

    async updateAuth(token: string) {
        const verifyToken = this.jwt.verify(token, { secret: 'secret' })

        if (!verifyToken) {
            throw new UnauthorizedException({
                displayMessage: 'Переавторизуйтесь пожалуйста',
            })
        }

        return {
            accessToken: await this.jwt.signAsync(
                {
                    id: verifyToken.id,
                    login: verifyToken.login,
                    role: verifyToken.role,
                    expiredAt: new Date().getDate() + 1,
                },
                { secret: 'secret', expiresIn: '1d' },
            ),
        }
    }
}
