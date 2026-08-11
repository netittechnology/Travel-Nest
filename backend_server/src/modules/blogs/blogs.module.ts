import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { BlogExistsPipe } from './pipes/blog-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    FileUploadModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogExistsPipe]
})
export class BlogsModule {}
