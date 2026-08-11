import { Module } from '@nestjs/common';
import { TailorMadeTourBookingController } from './tailor-made-tour-booking.controller';
import { TailorMadeTourBookingService } from './tailor-made-tour-booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TailorMadeBooking } from './entities/tailor-made-bookings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TailorMadeBooking]),
  ],
  controllers: [TailorMadeTourBookingController],
  providers: [TailorMadeTourBookingService]
})
export class TailorMadeTourBookingModule {}
