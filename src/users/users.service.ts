import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO'
import { PrismaService } from '../database/Database'

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async loginAsync(requestData: LoginDTO) {

        const {login, password} = requestData

        const user = this.prisma.user.findUnique({
            where: {
                login:
            }
        })
   }
}
