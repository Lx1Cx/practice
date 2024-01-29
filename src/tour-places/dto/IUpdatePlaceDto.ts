import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class IUpdatePlaceDto {
    @ApiProperty()
    @IsString({
        message: "Имя должно быть строкой"
    })
    name: string
}