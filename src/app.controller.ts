import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { News } from './dto/news.dto';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  async getNews(): Promise<News[]> {
    return this.appService.getNews();
  }

  @Get('get-one')
  async getNew(@Query() query: { id: number }): Promise<News | undefined> {
    return this.appService.getNew(query.id);
  }

  @Post('create')
  async createNews(@Body() data: News): Promise<News> {
    return this.appService.createNew(data);
  }

  @Post('update')
  async updateNews(@Body() data: News): Promise<News> {
    return this.appService.updateNews(data);
  }

  @Delete('delete')
  async deleteNew(@Body() body: { id: number }): Promise<News[]> {
    return this.appService.deleteNew(body.id);
  }
}
