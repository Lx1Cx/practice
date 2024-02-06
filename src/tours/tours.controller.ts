import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ToursService } from './tours.service';
import { Tour } from '@prisma/client'
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateTourDto } from './dto/CreateTourDto'
import { TourEntity } from './tour.entity'
import { BadRequestException } from '../errors/BadRequestException'
import { NotFoundException } from '../errors/NotFoundException'

@ApiTags("tours")
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get("")
  @ApiOperation({summary: "Получить все туры"})
  @ApiOkResponse({
    type: TourEntity,
    isArray: true
  })
  getAll(): Promise<Tour[]> {
    return this.toursService.getAll()
  }

  @Get(":tourId")
  @ApiOperation({summary: "Получить тур по id"})
  @ApiOkResponse({
    type: TourEntity
  })
  @ApiNotFoundResponse({
    type: NotFoundException
  })
  getById(@Param("tourId") tourId: string) {
    return this.toursService.getByIdAsync(tourId)
  }

  @Post()
  @ApiOperation({summary: "Содать тур"})
  @ApiOkResponse({
    type: TourEntity
  })
  @ApiBadRequestResponse({
    type: BadRequestException
  })
  create(@Body() requestData: CreateTourDto): Promise<Tour> {
    return this.toursService.createAsync(requestData)
  }

  @Delete(":tourId")
  @ApiOperation({summary: "Удалить тур по id"})
  @ApiNotFoundResponse({
    type: NotFoundException
  })
  deleteById(@Param("tourId") tourId: string) {
    return this.toursService.deleteByIdAsync(tourId)
  }
}