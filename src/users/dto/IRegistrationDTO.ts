import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class IRegistrationDTO {
    @ApiProperty()
    login: string

    @IsString()
    password: string
}