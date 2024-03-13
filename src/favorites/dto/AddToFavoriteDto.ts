import { ApiProperty, ApiTags } from '@nestjs/swagger'

export class AddToFavoriteDto {
    @ApiProperty()
    userId: number

    @ApiProperty()
    tourId: string
}