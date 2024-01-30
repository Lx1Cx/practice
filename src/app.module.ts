import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';
import { AppLoggerMiddleware } from './middleware/AppLoggerMiddleware'
import { OrdersModule } from './orders/orders.module';
import { TourPlacesModule } from './tour-places/tour-places.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
    imports: [
        UsersModule,
        OrdersModule,
        TourPlacesModule,
        FilesModule,
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, "..", "static")
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}