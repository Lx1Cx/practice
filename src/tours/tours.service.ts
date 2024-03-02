import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Tour } from '@prisma/client'
import { CreateTourDto } from './dto/CreateTourDto'
import { PrismaService } from '../database/Database'

@Injectable()
export class ToursService {

    constructor(private prisma: PrismaService) {}

    async createAsync(requestData: CreateTourDto): Promise<Tour> {
        const findTour = await this.prisma.tour.findUnique({
            where: {
                name: requestData.name
            }
        })

        if (findTour) {
            throw new BadRequestException({
                displayMessage: "Тур с таким имнем уже есть"
            })
        }

        return this.prisma.tour.create({
            data: {
                name: requestData.name,
                description: requestData.description,
                price: requestData.price,
                dateStart: requestData.dateStart,
                dateEnd: requestData.dateEnd,
                tourTo: {
                    connect: {
                        id: requestData.to
                    }
                },
                tourFrom: {
                    connect: {
                        id: requestData.from
                    }
                },
                images: {
                    connect: requestData.images_Ids.map(id => ({
                        id: id
                    }))
                }
            },
        })
    }

    getAll(): Promise<Tour[]> {
        return this.prisma.tour.findMany({
            include: {
                images: true,
                tourTo: true,
                tourFrom: true
            },
        })
    }

    async getByIdAsync(tourId: string): Promise<Tour> {
        const findTour = await this.prisma.tour.findUnique({
            where: {
                id: tourId
            },
            include: {
                images: true
            }
        })

        if (!findTour) {
            throw new NotFoundException({
                displayMessage: `Тур с id ${tourId} не найден`
            })
        }

        return findTour
    }

    async deleteByIdAsync(tourId: string) {
        const findTour = this.prisma.tour.findUnique({
            where: {
                id: tourId
            }
        })

        if (!findTour) {
            throw new NotFoundException({
                displayMessage: `Тур с id ${tourId} не найден`
            })
        }

        return this.prisma.tour.delete({
            where: {
                id: tourId
            }
        })
    }
}
