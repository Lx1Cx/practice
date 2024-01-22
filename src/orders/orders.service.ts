import { BadRequestException, Injectable } from '@nestjs/common'
import { ICreateOrderDto } from './dto/ICreateOrderDto'
import { PrismaService } from '../database/Database'

@Injectable()
export class OrdersService {

    constructor(private prisma: PrismaService) {}

    async createAsync({tourId, userId}: ICreateOrderDto) {
        const order = await this.prisma.order.findFirst({
            where: {
                tourId,
                userId
            }
        })

        if (order) {
            throw new BadRequestException({
                displayMessage: "Заказ уже существует"
            })
        }

        return this.prisma.order.create({
            data: {
                tourId,
                userId
            }
        })
    }

    async getAllAsync() {

    }
}
