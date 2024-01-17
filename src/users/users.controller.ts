import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { UsersService } from './users.service';
import { LoginDTO } from './dto/LoginDTO'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags, ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { UserDTO } from './dto/UserDTO'
import { UnauthorizedException } from '../errors/UnauthorizedException'

@ApiTags("users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
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
}
