import { NestFactory } from '@nestjs/core';
import { PbEnv } from '@pb-config/environments/pb-env/pb-env.service';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pbEnv = app.get(PbEnv);

  await app.listen(pbEnv.Port, '0.0.0.0');
}
bootstrap();
