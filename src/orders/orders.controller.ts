import { Body, Controller, Get, Post } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { ICreateOrderDto } from './dto/ICreateOrderDto'
import { ApiTags } from '@nestjs/swagger'
import { Order } from '@prisma/client'

@ApiTags("orders")
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post('')
    async createAsync(@Body() requestData: ICreateOrderDto): Promise<Order> {
        return this.ordersService.createAsync(requestData)
    }

    @Get()
    async getAllAsync() {

    }
}
