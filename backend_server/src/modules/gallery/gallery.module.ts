import { Module } from '@nestjs/common';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { GalleryExistsPipe } from './pipes/gallery-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery]),
    FileUploadModule,
  ],
  controllers: [GalleryController],
  providers: [GalleryService, GalleryExistsPipe]
})
export class GalleryModule {}
