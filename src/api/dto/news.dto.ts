import { Comment } from './comments.dto';
import {
  IsArray,
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateNews {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  text!: string;

  @IsArray()
  @IsOptional()
  comments!: Comment[];
}

export class News extends CreateNews {
  @IsInt()
  @IsPositive()
  id!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
