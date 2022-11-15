import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommentsController } from './controllers/comments.controller';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { NewsModule } from './modules/news/news.module';
import { MailController } from '../mail/mail.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    NewsModule,
    CommentsModule,
    MailModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [NewsController, CommentsController, MailController],
})
export class AppModule {}
