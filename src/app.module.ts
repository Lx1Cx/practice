import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';
import { AppLoggerMiddleware } from './middleware/AppLoggerMiddleware'
import { OrdersModule } from './orders/orders.module';
import { TourPlacesModule } from './tour-places/tour-places.module';

@Module({
    imports: [UsersModule, OrdersModule, TourPlacesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}