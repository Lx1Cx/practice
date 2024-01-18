import { BadGatewayException, Injectable } from '@nestjs/common'
import { PrismaService } from '../database/Database'
import { ICreateTourDTO } from './dto/ICreateTourDTO'

@Injectable()
export class ToursService {
    constructor(private readonly prisma: PrismaService) {}

    async create({name, description, dateStart, dateEnd}: ICreateTourDTO) {
        const tour = await this.prisma.tour.findUnique({
            where: {
                name
            }
        })

        if (tour) {
            throw new BadGatewayException({
                displayMessage: "Тур с текущим именем уже существует"
            })
        }

        await this.prisma.tour.create({
            data: {
                name,
                description,
                dateStart,
                dateEnd
            }
        })
    }

    async getAll() {
        return this.prisma.tour.findMany()
    }
}
