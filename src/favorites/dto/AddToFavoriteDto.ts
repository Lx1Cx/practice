import { ApiProperty, ApiTags } from '@nestjs/swagger'

export class AddToFavoriteDto {
    @ApiProperty()
    userId: string

    @ApiProperty()
    tourId: string
}