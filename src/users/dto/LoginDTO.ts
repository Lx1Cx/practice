import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {
    @ApiProperty({
        default: 'tester',
    })
    @IsString()
    login: string

    @ApiProperty({
        default: 'tester',
    })
    @IsString()
    password: string
}
