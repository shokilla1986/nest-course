import { Injectable } from '@nestjs/common';
import { Comment } from '../../../api/dto/comments.dto';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentsService {
  constructor(private readonly newsService: NewsService) {}

  async getComments(newId: number): Promise<Comment[]> {
    const news = await this.newsService.getNews();
    return news[newId].comments;
  }

  async getComment(
    newId: number,
    commentId: number,
  ): Promise<Comment | undefined> {
    const news = await this.newsService.getNews();
    const comments = news[newId].comments;
    return comments[commentId];
  }

  async createComment(newId: number, data: Comment): Promise<Comment> {
    const news = await this.newsService.getNews();
    console.log('news[newId].comments ', news[newId].comments);
    console.log('data ', data);
    if (!news[newId].comments) {
      news[newId].comments = [];
      console.log('news[newId].comments [] ', news[newId].comments);
    }
    console.log('news[newId].comments::: ', news[newId].comments);
    news[newId].comments.push(data);
    return data;
  }

  async updateComment(
    newId: number,
    commentId: number,
    data: Comment,
  ): Promise<Comment> {
    const news = await this.newsService.getNews();
    const newsItem = news[newId];
    const comments = newsItem.comments;
    let existingComment = comments[commentId];
    existingComment = {
      ...existingComment,
      ...data,
    };
    comments[commentId] = existingComment;
    return comments[commentId];
  }

  async deleteComment(newId: number, commentId: number): Promise<Comment[]> {
    const news = await this.newsService.getNews();
    const newsItem = news[newId - 1];
    const comments = newsItem.comments;
    if (comments) {
      comments.splice(commentId, 1);
      return comments;
    } else throw new Error('Comment not found');
  }
}
