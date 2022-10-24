import { Module } from '@nestjs/common';
import { CommentsController } from '../../controllers/comments.controller';
import { NewsModule } from '../news/news.module';
import { CommentsService } from './comments.service';

@Module({
  imports: [NewsModule],
  controllers: [CommentsController],
  providers: [Array, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
