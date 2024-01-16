import { IsString, Length, minLength } from 'class-validator'

export class LoginDTO {

    @IsString()
    @Length(6, 12)
    login: string

    @IsString()
    @Length(6, 12)
    password: string
}