import { IsArray, IsDate, IsInt, IsString } from 'class-validator'
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

    @IsDate()
    @ApiProperty()
    dateStart: Date

    @IsDate()
    @ApiProperty()
    dateEnd: Date

    @IsString()
    @ApiProperty()
    tourPlaceFrom: string

    @IsString()
    @ApiProperty()
    tourPlaceTo: string

    @IsArray()
    @ApiProperty()
    images_Ids: string[]
}