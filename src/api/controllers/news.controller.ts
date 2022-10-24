import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { News } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { htmlTemplate } from '../../views/template';
import { newsTemplate } from '../../views/news';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  async getNews(): Promise<News[]> {
    return this.newsService.getNews();
  }

  @Get('get-one')
  async getNew(@Query() query: { id: number }): Promise<News | undefined> {
    return this.newsService.getNew(query.id);
  }

  @Post('create')
  async createNews(@Body() data: News): Promise<News> {
    return this.newsService.createNew(data);
  }

  @Put('update')
  async updateNews(@Body() data: News): Promise<News> {
    return this.newsService.updateNews(data);
  }

  @Delete('delete')
  async deleteNew(@Body() body: { id: number }): Promise<News[]> {
    return this.newsService.deleteNew(body.id);
  }

  @Get()
  async getViewAll(): Promise<string> {
    const posts = await this.newsService.getNews();

    return htmlTemplate(newsTemplate(posts));
  }
}
