import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Injectable()
class IpRestrictionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedIps = ['127.0.0.1'];
    const requesterIp = req.ip;

    if (allowedIps.includes(requesterIp)) {
      next();
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>>,
      next: NextFunction,
    ) => new IpRestrictionMiddleware().use(req, res, next),
  );
  await app.listen(8000);
}
bootstrap();
