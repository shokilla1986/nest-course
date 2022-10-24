import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommentsService } from '../modules/comments/comments.service';
import { Comment } from '../dto/comments.dto';
import { DecrementId } from '../../utils/decorators/decrement-id';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('get-all')
  async getComments(
    @Query() @DecrementId(['postId']) query: { postId: number },
  ): Promise<Comment[]> {
    console.log('get', query);

    return this.commentsService.getComments(query.postId);
  }

  @Get('get-one')
  async getComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: {
      postId: number;
      commentId: number;
    },
  ): Promise<Comment | undefined> {
    console.log('get-1', query);
    return this.commentsService.getComment(query.postId, query.commentId);
  }

  @Post('create')
  async createComment(
    @Query() @DecrementId(['postId']) query: { postId: number },
    @Body() data: Comment,
  ): Promise<Comment> {
    console.log('post', query);
    return this.commentsService.createComment(query.postId, data);
  }

  @Delete('delete')
  async deleteComment(
    @Body()
    body: {
      postId: number;
      commentId: number;
    },
  ): Promise<Comment[]> {
    console.log('delete', body);
    return this.commentsService.deleteComment(body.postId, body.commentId);
  }

  @Put('update')
  async updateComment(
    @Query()
    @DecrementId(['postId', 'commentId'])
    query: { postId: number; commentId: number },
    @Body()
    body: Comment,
  ): Promise<Comment> {
    console.log('update query: ', query);
    console.log('update body: ', body);

    return this.commentsService.updateComment(
      query.postId,
      query.commentId,
      body,
    );
  }
  // @Put('update')
  // async updateComment(
  //   @Query()
  //   @DecrementId(['postId', 'commentId'])
  //   query: {},
  //   @Body()
  //   body: Comment,
  // ): Promise<Comment> {
  //   console.log('update query: ', query);
  //   console.log('update body: ', body);

  //   return this.commentsService.updateComment(body);
  // }
}
