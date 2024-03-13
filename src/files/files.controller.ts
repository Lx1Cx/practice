import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FilesService } from './files.service'
import {
    ApiBody,
    ApiConsumes,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express'
import { NotFoundException } from '../errors/NotFoundException'

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('/upload')
    @ApiOperation({ summary: 'Загрузка файла на сервер' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadFile(file)
    }

    @Delete(':name')
    @ApiOperation({ summary: 'Удаление файла с сервера' })
    @ApiOkResponse({
        status: 200,
    })
    @ApiNotFoundResponse({
        type: NotFoundException,
    })
    deleteFileByName(@Param('name') name: string) {
        return this.filesService.deleteFileByName(name)
    }
}
