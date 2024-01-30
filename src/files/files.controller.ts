import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'

@ApiTags("Files")
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("/upload")
  @ApiOperation({summary: "Загрузка файла на сервер"})
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file)
  }

  @Get(``)
  @ApiOperation({summary: "Получение файла"})
  getFile() {

  }

}
