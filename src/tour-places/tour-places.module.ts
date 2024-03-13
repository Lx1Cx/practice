import { Module } from '@nestjs/common'
import { TourPlacesService } from './tour-places.service'
import { TourPlacesController } from './tour-places.controller'
import { PrismaService } from '../database/Database'

@Module({
    controllers: [TourPlacesController],
    providers: [TourPlacesService, PrismaService],
})
export class TourPlacesModule {}
