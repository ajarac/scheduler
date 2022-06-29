import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from '../guards/public.guard';

@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @HttpCode(HttpStatus.OK)
  health() {
    return 'Hello scheduler!';
  }
}
