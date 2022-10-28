import { Injectable } from '@nestjs/common';
import { Comment, CreateComment } from '../../../api/dto/comments.dto';
import { NewsService } from '../news/news.service';
import { MyLogger } from '../logger/logger.service';
import { MailService } from '../../../mail/mail.service';

let commentId = 3;

@Injectable()
export class CommentsService {
  constructor(
    private readonly newsService: NewsService,
    private readonly logger: MyLogger,
    private readonly mailService: MailService,
  ) {
    this.logger.setContext('CommentsService');
  }

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

  async createComment(newId: number, data: CreateComment): Promise<Comment> {
    await this.mailService.sendLogMessage('shokilla@mail.ru');
    const news = await this.newsService.getNews();
    if (!news[newId].comments) {
      news[newId].comments = [];
    }
    const comment: Comment = {
      ...data,
      id: commentId++,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      attachments: null,
    };
    news[newId].comments.push(comment);
    return comment;
  }

  async updateComment(
    newId: number,
    commentId: number,
    data: CreateComment,
  ): Promise<Comment> {
    const news = await this.newsService.getNews();
    const newsItem = news[newId];
    const comments = newsItem.comments;
    let existingComment = comments[commentId];
    existingComment.updatedAt = new Date(Date.now());
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
      comments.splice(commentId - 1, 1);
      return comments;
    } else throw new Error('Comment not found');
  }

  async assignFile(
    newsId: number,
    commentId: number,
    path: string,
  ): Promise<void> {
    this.logger.warn(
      `New file assigned to postId ${newsId} and commentId ${commentId}`,
    );
    const posts = await this.newsService.getNews();
    posts[newsId - 1].comments[commentId - 1].attachments = path;
  }

  async getPath(newsId: number, commentId: number): Promise<string | null> {
    const posts = await this.newsService.getNews();
    return posts[newsId].comments[commentId].attachments;
  }
}
