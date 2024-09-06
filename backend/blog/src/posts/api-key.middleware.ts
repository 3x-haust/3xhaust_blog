import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const apiKey = req.query.key;
    const validApiKey = process.env.KEY;

    if (apiKey !== validApiKey) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          timestamp: new Date().toISOString(),
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    next();
  }
}
