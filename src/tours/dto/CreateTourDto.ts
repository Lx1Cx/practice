import { IsArray, IsInt, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTourDto {
    @ApiProperty()
    @IsString()
    name: string

    @IsString()
    @ApiProperty()
    description: string

    @IsInt()
    @ApiProperty()
    price: number

    @ApiProperty()
    dateStart: Date

    @ApiProperty()
    dateEnd: Date

    @IsString()
    @ApiProperty()
    from: string

    @IsString()
    @ApiProperty()
    to: string

    @IsArray()
    @ApiProperty()
    images_Ids: string[]
}