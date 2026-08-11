import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Files]),
    CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage()
    }),
  ],
  providers: [FileUploadService],
  exports: [FileUploadService]
})
export class FileUploadModule {}
