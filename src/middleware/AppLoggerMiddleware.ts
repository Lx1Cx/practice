import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP')

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, baseUrl } = request
        const userAgent = request.get('user-agent') || ''

        response.on('close', () => {
            const { statusCode } = response

            if (baseUrl[1] !== '/') {
                this.logger.log(
                    `${method} ${baseUrl} ${statusCode} - ${userAgent} ${ip}`,
                )
            }
        })

        next()
    }
}
