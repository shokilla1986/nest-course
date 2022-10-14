import { Injectable } from '@nestjs/common';
import { News } from './dto/news.dto';

const news: News[] = [
  {
    id: 1,
    name: 'first',
    description: 'first',
    text: 'first',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  },
];

@Injectable()
export class AppService {
  async getNews(): Promise<News[]> {
    return news;
  }

  async createNew(data: News): Promise<News> {
    news.push(data);
    return data;
  }
}
