import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ToursService } from './tours.service';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ICreateTourDTO } from './dto/ICreateTourDTO'
import { BadRequestException } from '../errors/BadRequestException'
import { TourEntity } from './TourEntity'
import { NotFoundException } from '../errors/NotFoundException'

@ApiTags("tours")
@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post("")
  @ApiOperation({summary: "Создание тура"})
  @ApiOkResponse()
  @ApiBadRequestResponse({
    type: BadRequestException
  })
  async create(@Body() requestData: ICreateTourDTO) {
    return await this.toursService.createAsync(requestData)
  }

  @Get("")
  @ApiOperation({summary: "Получение списка тура"})
  @ApiOkResponse({
    type: TourEntity,
    isArray: true
  })
  async getAll(): Promise<TourEntity[]> {
    return await this.toursService.getAllAsync()
  }

  @Get(":tourId")
  @ApiOperation({summary: "Получение тура по id"})
  @ApiOkResponse({
    type: TourEntity
  })
  @ApiNotFoundResponse({
    type: NotFoundException
  })
  async getById(@Query("tourId") tourId: string): Promise<TourEntity> {
    return await this.toursService.getByIdAsync(tourId)
  }

  @Delete(":tourId")
  @ApiOperation({summary: "Удаление тура по id"})
  @ApiOkResponse()
  @ApiBadRequestResponse({
    type: BadRequestException
  })
  @ApiNotFoundResponse({
    type: NotFoundException
  })
  async deleteById(@Query("tourId") tourId: string) {
    return await this.toursService.deleteByIdAsync(tourId)
  }
}
