import { Module } from '@nestjs/common';
import { TourController } from './tour.controller';
import { TourService } from './tour.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { TourExistsPipe } from './pipes/tour-exists.pipe';
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    FileUploadModule,
  ],
  controllers: [TourController],
  providers: [TourService, TourExistsPipe],
  exports: [TourService, TourExistsPipe]
})
export class TourModule {}
