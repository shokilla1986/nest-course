import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { News, CreateNews } from '../dto/news.dto';
import { NewsService } from '../modules/news/news.service';
import { htmlTemplate } from '../../views/template';
import { newsTemplate } from '../../views/news';
import { DecrementId } from '../../utils/decorators/decrement-id';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  async getNews(): Promise<News[]> {
    return this.newsService.getNews();
  }

  @Get('get-one')
  async getNew(
    @Query() @DecrementId(['newsId']) query: { newsId: number },
  ): Promise<News | undefined> {
    return this.newsService.getNew(query.newsId);
  }

  @Post('create')
  async createNews(@Body() data: CreateNews): Promise<News> {
    return this.newsService.createNew(data);
  }

  @Put('update')
  async updateNews(
    @Query()
    @DecrementId(['newsId'])
    query: { newsId: number },
    @Body() data: CreateNews,
  ): Promise<News> {
    return this.newsService.updateNews(query.newsId, data);
  }

  @Delete('delete')
  async deleteNew(@Body() body: { newsId: number }): Promise<News[]> {
    return this.newsService.deleteNew(body.newsId);
  }

  @Get()
  async getViewAll(): Promise<string> {
    const posts = await this.newsService.getNews();

    return htmlTemplate(newsTemplate(posts));
  }
}
