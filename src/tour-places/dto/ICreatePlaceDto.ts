import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ICreatePlaceDto {
    @ApiProperty()
    @IsString({
        message: "Имя должно быть строкой"
    })
    name: string

    @ApiProperty()
    @IsString({
        message: "Описание должно быть строкой"
    })
    description: string
}