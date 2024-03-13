import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { TourPlacesService } from './tour-places.service'
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { TourPlaceEntity } from './TourPlace.entity'
import { NotFoundException } from '../errors/NotFoundException'
import { BadRequestException } from '../errors/BadRequestException'
import { ICreatePlaceDto } from './dto/ICreatePlaceDto'
import { IUpdatePlaceDto } from './dto/IUpdatePlaceDto'

@ApiTags('tour-places')
@Controller('tour-places')
export class TourPlacesController {
    constructor(private readonly tourPlacesService: TourPlacesService) {}

    @Get('')
    @ApiOperation({ summary: 'Получение всех возможных мест назначения' })
    @ApiOkResponse({
        status: 200,
        type: TourPlaceEntity,
    })
    getAllAsync(): Promise<TourPlaceEntity[]> {
        return this.tourPlacesService.getAll()
    }

    @Get(':placeId')
    @ApiOperation({ summary: 'Получение место назначения по id' })
    @ApiOkResponse({
        status: 200,
        type: TourPlaceEntity,
    })
    @ApiNotFoundResponse({
        type: NotFoundException,
    })
    getByIdAsync(@Param('placeId') placeId: string): Promise<TourPlaceEntity> {
        return this.tourPlacesService.getByIdAsync(placeId)
    }

    @Post('')
    @ApiOperation({ summary: 'Создания места' })
    @ApiOkResponse({
        status: 201,
        type: TourPlaceEntity,
    })
    @ApiNotFoundResponse({
        type: BadRequestException,
    })
    create(@Body() requestData: ICreatePlaceDto): Promise<TourPlaceEntity> {
        return this.tourPlacesService.createPlace(requestData)
    }

    @Put(':placeId')
    @ApiOperation({ summary: 'Обновление места по id' })
    @ApiOkResponse({
        type: TourPlaceEntity,
    })
    @ApiNotFoundResponse({
        type: BadRequestException,
    })
    @ApiNotFoundResponse({
        type: NotFoundException,
    })
    updateById(
        @Param('placeId') placeId: string,
        @Body() requestData: IUpdatePlaceDto,
    ): Promise<TourPlaceEntity> {
        return this.tourPlacesService.updateByIdAsync(placeId, requestData)
    }

    @Delete(':placeId')
    @ApiOperation({ summary: 'Удаление места по id' })
    @ApiOkResponse({
        type: TourPlaceEntity,
    })
    @ApiNotFoundResponse({
        type: BadRequestException,
    })
    @ApiNotFoundResponse({
        type: NotFoundException,
    })
    deleteById(@Param('placeId') placeId: string) {
        return this.tourPlacesService.deleteByIdAsync(placeId)
    }
}
