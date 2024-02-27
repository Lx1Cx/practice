import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class IRegistrationDTO {
    @ApiProperty({
        default: "tester"
    })
    @IsString()
    login: string

    @ApiProperty({
        default: "tester"
    })
    @IsString()
    password: string
}