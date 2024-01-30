import { BadRequestException, Injectable } from '@nestjs/common'
import { Express } from 'express'
import * as uuid from 'uuid';
import * as path from 'path'
import * as fs from 'fs'

@Injectable()
export class FilesService {

    async uploadFile(file: Express.Multer.File) {
        const fileExtension = path.extname(file.originalname)
        const newFileName = uuid.v4() + fileExtension

        const newFilePath = path.resolve("static/" + newFileName)

        if (!fs.existsSync(path.resolve("static"))) {
            fs.mkdirSync(path.resolve("static"))
        }

        if (fs.existsSync(newFilePath)) {
            throw new BadRequestException({
                displayMessage: "Имя файла не может быть одинаковым"
            })
        }

        fs.appendFileSync(newFilePath, file.buffer)
    }
}
