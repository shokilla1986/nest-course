import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { News } from './dto/news.dto';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-all')
  async getNews(): Promise<News[]> {
    return this.appService.getNews();
  }

  @Post('create')
  async createNews(@Body() data: News): Promise<News> {
    return this.appService.createNew(data);
  }
}
