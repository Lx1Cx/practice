import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
        .setTitle("Tour agency")
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("/api", app, document)

    await app.listen(5000)

    console.log("Swagger working on http://localhost:5000/api")
}
bootstrap()
