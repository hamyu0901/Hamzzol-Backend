import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController, TestController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './routes/login/login.module';
import { CommonModule } from './routes/common/common.module';
import { TestMiddleware, TestMiddleware2 } from './middleware/TestMiddleware';
import { MainDBModule } from '@/database/main/main.module';
@Module({
  imports: [LoginModule, MainDBModule, CommonModule],
  controllers: [AppController, TestController], //TestController추가
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TestMiddleware)
      .forRoutes({ path: 'test/middleware-test/*', method: RequestMethod.GET }); //테스트 미들웨어1 추가
    consumer.apply(TestMiddleware2).forRoutes('test/middleware-test2'); //테스트 미들웨어2 추가
  }
}
