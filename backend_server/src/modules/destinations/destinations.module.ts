import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { DestinationExistsPipe } from './pipes/destination-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Destination]),
    FileUploadModule,
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService, DestinationExistsPipe]
})
export class DestinationsModule {}
