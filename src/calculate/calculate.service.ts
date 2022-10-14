import { Injectable } from '@nestjs/common';
import { Calculate, Operations } from './dto/calculate.dto';

@Injectable()
export class CalculateService {
  calculateNumbers(data: Calculate): number {
    if (data.operation === Operations.SUM) {
      return data.num1 + data.num2;
    }
    if (data.operation === Operations.DIFFERENT) {
      return data.num1 / data.num2;
    }
    if (data.operation === Operations.MULTYPLY) {
      return data.num1 * data.num2;
    }
  }
}
