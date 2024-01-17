import { ApiProperty } from '@nestjs/swagger'

export class UnauthorizedException extends Error{
    @ApiProperty()
    displayMessage: string
}