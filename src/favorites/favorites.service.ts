import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../database/Database'

@Injectable()
export class FavoritesService {

    constructor(private readonly prisma: PrismaService) {}

    getAll(userId: number) {
        return this.prisma.favorites.findMany({
            where: {
                userId: userId
            }
        })
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
