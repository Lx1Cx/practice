import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class IRegistrationDTO {
    @ApiProperty({
        default: "tester"
    })
    @IsString()
    @Length(6, 12)
    login: string

    @ApiProperty({
        default: "tester"
    })
    @IsString()
    @Length(6, 12)
    password: string
}