import { Injectable } from '@nestjs/common';
import { News } from '../../dto/news.dto';

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
      },
      {
        id: 2,
        text: 'comment second',
        createdAt: new Date(Date.now()),
      },
    ],
  },
];

@Injectable()
export class NewsService {
  async getNews(): Promise<News[]> {
    return news;
  }

  async getNew(id: number): Promise<News | undefined> {
    return news[id - 1];
  }

  async createNew(data: News): Promise<News> {
    news.push(data);
    return data;
  }

  async updateNews(data: News): Promise<News> {
    let editNews = news[data.id];
    if (editNews) {
      editNews = {
        ...editNews,
        ...data,
      };

      news[data.id] = editNews;
      return news[data.id];
    } else {
      throw new Error('Post not found');
    }
  }

  async deleteNew(id: number): Promise<News[]> {
    const post = news[id];
    if (post) {
      news.splice(id, id);
      return news;
    } else throw new Error('Post not found');
  }
}
