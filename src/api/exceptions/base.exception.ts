import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export abstract class BaseException implements ExceptionFilter {
  protected constructor(private readonly httpStatus: HttpStatus) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: this.httpStatus,
      message: exception.message
    });
  }
}
