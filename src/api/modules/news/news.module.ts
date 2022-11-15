import { Module } from '@nestjs/common';
import { NewsController } from '../../controllers/news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
