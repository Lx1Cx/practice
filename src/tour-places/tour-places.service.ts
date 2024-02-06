import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/Database'
import { ICreatePlaceDto } from './dto/ICreatePlaceDto'
import { IUpdatePlaceDto } from './dto/IUpdatePlaceDto'

@Injectable()
export class TourPlacesService {

    constructor(private readonly prisma: PrismaService) {
    }

    getAll() {
        return this.prisma.tourPlaces.findMany({
            include: {
                images: true
            }
        })
    }

    async getByIdAsync(id: string) {
        const place = await this.prisma.tourPlaces.findUnique({
            where: {
                id: id
            },
            include: {
                images: true
            }
        })

        if (!place) {
            throw new NotFoundException({
                displayMessage: "Не найдено"
            })
        }

        return place
    }

    async createPlace({name, description, imageIds}: ICreatePlaceDto) {
        const findPlaceResult = await this.prisma.tourPlaces.findUnique({
            where: { name }
        })

        if (findPlaceResult) {
            throw new BadRequestException({
                displayMessage: "Место назначение с таким именем уже существует"
            })
        }

        return this.prisma.tourPlaces.create({
            data: {
                name,
                description,
                images: {
                    connect: imageIds.map(id => ({
                        id: id
                    }))
                }
            }
        })
    }

    async deleteByIdAsync(id: string) {
        const findPlace = await this.prisma.tourPlaces.findUnique({
            where: { id }
        })

        if (!findPlace) {
            throw new BadRequestException({
                displayMessage: "Место назначение с id не существует"
            })
        }

        return this.prisma.tourPlaces.delete({
            where: { id }
        })
    }

    async updateByIdAsync(id: string, {name} : IUpdatePlaceDto) {
        const findPlace = await this.prisma.tourPlaces.findUnique({
            where: { id }
        })

        if (!findPlace) {
            throw new NotFoundException({
                displayMessage: "Место назначение с id не существует"
            })
        }

        return this.prisma.tourPlaces.update({
            where: { id },
            data: { name }
        })
    }
}
