import { ApiProperty } from '@nestjs/swagger'

export class NotFoundException extends Error {
    @ApiProperty()
    displayMessage: string
}