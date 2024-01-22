import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module';
import { AppLoggerMiddleware } from './middleware/AppLoggerMiddleware'
import { ToursModule } from './tours/tours.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [UsersModule, ToursModule, OrdersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}