import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { Express } from 'express'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { PrismaService } from '../database/Database'

@Injectable()
export class FilesService {
    constructor(private readonly prisma: PrismaService) {}

    async uploadFile(file: Express.Multer.File) {
        const fileExtension = path.extname(file.originalname)
        const newFileName = uuid.v4() + fileExtension

        const newFilePath = path.resolve('static/' + newFileName)

        if (!fs.existsSync(path.resolve('static'))) {
            fs.mkdirSync(path.resolve('static'))
        }

        if (fs.existsSync(newFilePath)) {
            throw new BadRequestException({
                displayMessage: 'Имя файла не может быть одинаковым',
            })
        }

        fs.appendFileSync(newFilePath, file.buffer)

        return this.prisma.files.create({
            data: {
                name: newFileName,
            },
        })
    }

    async deleteFileByName(name: string) {
        if (!fs.existsSync(path.resolve('static', name))) {
            throw new NotFoundException({
                displayMessage: 'Файл не найден',
            })
        }

        fs.unlink(path.resolve('static', name), (err) => {
            if (err) {
                throw new BadRequestException({
                    displayMessage: err.message,
                })
            }
        })

        return this.prisma.files.delete({
            where: {
                name: name,
            },
        })
    }
}
