import { Body, Controller, Post, Put } from '@nestjs/common';
import { CalculateService } from './calculate.service';
import { Calculate } from './dto/calculate.dto';

@Controller('calculate')
export class CalculateController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post('calculate')
  async calculateNumbers(@Body() data: Calculate) {
    return this.calculateService.calculateNumbers(data);
  }
}
