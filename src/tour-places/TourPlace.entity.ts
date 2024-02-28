import { ApiProperty } from '@nestjs/swagger'

export class TourPlaceEntity {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string
}