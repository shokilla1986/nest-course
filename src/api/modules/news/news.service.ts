import { Injectable } from '@nestjs/common';
import { CreateNews, News } from '../../dto/news.dto';

const news: News[] = [
  {
    id: 1,
    name: 'first',
    description: 'first',
    text: 'first',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    comments: [
      {
        id: 1,
        text: 'comment',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        attachments: null,
      },
      {
        id: 2,
        text: 'comment second',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        attachments: null,
      },
    ],
  },
];
let newsId = 2;

@Injectable()
export class NewsService {
  async getNews(): Promise<News[]> {
    return news;
  }

  async getNew(newsId: number): Promise<News | undefined> {
    return news[newsId];
  }

  async createNew(data: CreateNews): Promise<News> {
    const newsItem: News = {
      ...data,
      id: newsId++,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };
    news.push(newsItem);
    return newsItem;
  }

  async updateNews(newsId: number, data: CreateNews): Promise<News> {
    let editNews = news[newsId];
    if (editNews) {
      editNews.updatedAt = new Date(Date.now());
      editNews = {
        ...editNews,
        ...data,
      };

      news[newsId] = editNews;
      return news[newsId];
    } else {
      throw new Error('Post not found');
    }
  }

  async deleteNew(newsId: number): Promise<News[]> {
    const post = news[newsId];
    if (post) {
      news.splice(newsId, 1);
      return news;
    } else throw new Error('Post not found');
  }
}
