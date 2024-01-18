import { IsDate, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ICreateTourDTO {

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsDate()
    dateStart: Date

    @ApiProperty()
    @IsDate()
    dateEnd: Date
}