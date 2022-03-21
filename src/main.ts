import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimeZone from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());

  /* sobrescrevemos a funcao toJSON do Date passando um objeto moment. Deste modo quando o objeto for serializado ele utilizara
    o formato de data definido por nos todos os objetos Date serao afetados com esta implementacao
  */

  Date.prototype.toJSON = function (): any {
    return momentTimeZone(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(8080);
}
bootstrap();
