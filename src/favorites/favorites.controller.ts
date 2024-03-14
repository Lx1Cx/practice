import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddToFavoriteDto } from './dto/AddToFavoriteDto'

@ApiTags("favorites")
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Get(":userId")
    @ApiOperation({summary: "Получение избранного пользователя"})
    getAll(@Param("userId") userId: number) {
        return this.favoritesService.getAll(userId)
    }

    @Post("")
    @ApiOperation({summary: "Добавление в избранное"})
    addToFavorite(@Body() {userId, tourId}: AddToFavoriteDto) {
        return this.favoritesService.addToFavorite(parseInt(userId), tourId)
    }

    @Delete(":favoriteId")
    @ApiOperation({summary: "Удаление иэлемента из избранного"})
    deleteById(@Param("favoriteId") favoriteId: number) {
        return this.favoritesService.deleteById(favoriteId)
    }
}
