import { Module } from '@nestjs/common';
import { CommentsController } from '../../controllers/comments.controller';
import { LoggerModule } from '../logger/logger.module';
import { NewsModule } from '../news/news.module';
import { CommentsService } from './comments.service';
import { MailModule } from '../../../mail/mail.module';

@Module({
  imports: [NewsModule, LoggerModule, MailModule],
  controllers: [CommentsController],
  providers: [Array, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
