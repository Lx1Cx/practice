import { Body, Controller, Post } from '@nestjs/common'
import { ToursService } from './tours.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { ICreateTourDTO } from './dto/ICreateTourDTO'
import { BadRequestException } from '../errors/BadRequestException'

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
    return await this.toursService.create(requestData)
  }
}
