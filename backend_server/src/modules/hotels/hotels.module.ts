import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { HotelExistsPipe } from './pipes/hotel-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotel]),
    FileUploadModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService, HotelExistsPipe]
})
export class HotelsModule {}
