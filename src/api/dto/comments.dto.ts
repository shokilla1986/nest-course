import {
  IsDate,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateComment {
  @IsString()
  text!: string;
}

export class Comment extends CreateComment {
  @IsInt()
  @IsPositive()
  id!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;

  @IsString()
  attachments!: string | null;
}
