import { Module } from '@nestjs/common';
import { TourBookingController } from './tour-booking.controller';
import { TourBookingService } from './tour-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourBooking } from './entities/tour-booking.entity';
import { TourModule } from '../../tours/tour.module';
import { TourBookingExistsPipe } from './pipes/tour-booking-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourBooking]),
    TourModule,
  ],
  controllers: [TourBookingController],
  providers: [TourBookingService, TourBookingExistsPipe],
  exports: [TourBookingService]
})
export class TourBookingModule {}
