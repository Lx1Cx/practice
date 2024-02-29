import { ApiProperty } from '@nestjs/swagger'

export class IUpdatePlaceDto {
    @ApiProperty()
    name?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    imageIds?: string[]
}