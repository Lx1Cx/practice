import { Body, Controller, Post } from '@nestjs/common'
import { UsersService } from './users.service';
import { LoginDTO } from './dto/LoginDTO'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/login")
  async login(@Body() loginDTO: LoginDTO) {
    return await this.usersService
  }
}
