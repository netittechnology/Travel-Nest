import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewExistsPipe } from './pipes/review-exists.pipe';
import { TourBookingModule } from '../bookings/tour-booking/tour-booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TourBookingModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewExistsPipe]
})
export class ReviewsModule {}
