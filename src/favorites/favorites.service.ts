import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/Database'

@Injectable()
export class FavoritesService {

    constructor(private readonly prisma: PrismaService) {}

    async getAll(userId: number) {

        const result = await this.prisma.favorites.findMany({
            where: {
                userId: Number(userId)
            },
            include: {
                tour: true
            }
        })

        console.log(result)

        return result
    }

    addToFavorite(userId: number, tourId: string) {
        return this.prisma.favorites.create({
            data: {
                userId,
                tourId
            }
        })
    }

    async deleteById(itemId: number) {
        const foundItem = this.prisma.favorites.findUnique({
            where: {
                id: itemId
            }
        })

        if (!foundItem) {
            return new NotFoundException({
                displayMessage: "Элемент не найден"
            })
        }

        await this.prisma.favorites.delete({
            where: {
                id: itemId
            }
        })
    }
}
