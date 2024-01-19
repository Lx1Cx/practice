import { ApiProperty } from '@nestjs/swagger'

export class TourEntity {

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    description: string

    @ApiProperty()
    dateStart: Date

    @ApiProperty()
    dateEnd: Date
}