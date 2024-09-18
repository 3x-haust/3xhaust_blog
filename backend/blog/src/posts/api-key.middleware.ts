import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['authorization'];
    const validApiKey = process.env.KEY;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          timestamp: new Date().toISOString(),
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const apiKey = authHeader.split(' ')[1];

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
