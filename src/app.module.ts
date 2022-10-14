import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculateModule } from './calculate/calculate.module';

@Module({
  imports: [CalculateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
