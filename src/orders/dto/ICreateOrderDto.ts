import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ICreateOrderDto {
    @ApiProperty()
    @IsString()
    userId: number

    @ApiProperty()
    @IsString()
    tourId: string
}
