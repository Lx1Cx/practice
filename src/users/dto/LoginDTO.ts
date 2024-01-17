import { IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {

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