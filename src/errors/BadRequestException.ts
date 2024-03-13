import { ApiProperty } from '@nestjs/swagger'

export class BadRequestException extends Error {
    @ApiProperty()
    displayMessage: string
}
