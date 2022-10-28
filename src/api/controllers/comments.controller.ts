import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from '../modules/comments/comments.service';
import { Comment, CreateComment } from '../dto/comments.dto';
import { DecrementId } from '../../utils/decorators/decrement-id';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { LoggingInterceptor } from '../modules/logger/logger.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('template')
  @Render('index')
  getTemplate(): { message: string } {
    return { message: 'Hello world!' };
  }

  @Get('get-all')
  async getComments(
    @Query() @DecrementId(['newsId']) query: { newsId: number },
  ): Promise<Comment[]> {
    console.log('get', query);

    return this.commentsService.getComments(query.newsId);
  }

  @Get('get-one')
  async getComment(
    @Query()
    @DecrementId(['newsId', 'commentId'])
    query: {
      newsId: number;
      commentId: number;
    },
  ): Promise<Comment | undefined> {
    return this.commentsService.getComment(query.newsId, query.commentId);
  }

  @Post('create')
  async createComment(
    @Query() @DecrementId(['newsId']) query: { newsId: number },
    @Body() data: CreateComment,
  ): Promise<Comment> {
    return this.commentsService.createComment(query.newsId, data);
  }

  @Delete('delete')
  async deleteComment(
    @Body()
    body: {
      newsId: number;
      commentId: number;
    },
  ): Promise<Comment[]> {
    console.log('delete', body);
    return this.commentsService.deleteComment(body.newsId, body.commentId);
  }

  @Put('update')
  async updateComment(
    @Query()
    @DecrementId(['newsId', 'commentId'])
    query: { newsId: number; commentId: number },
    @Body()
    body: CreateComment,
  ): Promise<Comment> {
    console.log('update query: ', query);
    console.log('update body: ', body);

    return this.commentsService.updateComment(
      query.newsId,
      query.commentId,
      body,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body()
    body: {
      newsId: number;
      commentId: number;
    },
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.commentsService.assignFile(
      body.newsId,
      body.commentId,
      file.path,
    );
  }

  @Get('file')
  async getFile(
    @Query()
    @DecrementId(['newsId', 'commentId'])
    query: {
      newsId: number;
      commentId: number;
    },
    @Res() res: Response,
  ) {
    const path = await this.commentsService.getPath(
      query.newsId,
      query.commentId,
    );
    if (!path) throw new Error('No attachment found');
    const file = createReadStream(join(process.cwd(), path));
    file.pipe(res);
  }
}
