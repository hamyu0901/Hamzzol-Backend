import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as history from 'connect-history-api-fallback';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(history());
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
