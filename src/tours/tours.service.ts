import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/Database'
import { ICreateTourDTO } from './dto/ICreateTourDTO'
import { TourEntity } from './TourEntity'

@Injectable()
export class ToursService {
    constructor(private readonly prisma: PrismaService) {}

    async createAsync({name, description, dateStart, dateEnd}: ICreateTourDTO) {
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

    async getAllAsync(): Promise<TourEntity[]> {
        return this.prisma.tour.findMany()
    }

    async getByIdAsync(tourId: string): Promise<TourEntity> {
        return this.prisma.tour.findUnique({
            where: {
                id: tourId
            }
        })
    }

    async deleteByIdAsync(tourId: string) {
        const tour = await this.prisma.tour.findUnique({
            where: {
                id: tourId
            }
        })

        if (!tour) {
            throw new NotFoundException({
                displayMessage: "Тур с указанным id не найден"
            })
        }

        return this.prisma.tour.delete({
            where: {
                id: tourId
            }
        })
    }
}
