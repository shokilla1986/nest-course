import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { News } from './dto/news.dto';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  async getNews(): Promise<News[]> {
    return this.appService.getNews();
  }

  @Post('create')
  async createNews(@Body() data: News): Promise<News> {
    return this.appService.createNew(data);
  }

  @Post('update')
  async updateNews(@Body() data: News): Promise<News> {
    return this.appService.updateNews(data);
  }
}
