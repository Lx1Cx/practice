import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { UsersService } from './users.service';
import { LoginDTO } from './dto/LoginDTO'
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserDTO } from './dto/UserDTO'
import { UnauthorizedException } from '../errors/UnauthorizedException'
import { IRegistrationDTO } from './dto/IRegistrationDTO'

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Авторизация пользователя"})
  @ApiOkResponse({
    status: 200,
    type: UserDTO
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException
  })
  @Post("/login")
  async login(@Body() loginDTO: LoginDTO): Promise<UserDTO> {
    return await this.usersService.loginAsync(loginDTO)
  }

  @ApiOperation({summary: "Регистрация пользователя"})
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    type: UnauthorizedException
  })
  @Post("/registration")
  async registration(@Body() registrationDTO: IRegistrationDTO) {
    return await this.usersService.registrationAsync(registrationDTO)
  }
}
