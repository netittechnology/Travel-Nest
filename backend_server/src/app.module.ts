import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { IdentityModule } from './modules/identity/identity.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { TourModule } from './modules/tours/tour.module';
import { DestinationsModule } from './modules/destinations/destinations.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { TourBookingModule } from './modules/bookings/tour-booking/tour-booking.module';
import { TailorMadeTourBookingModule } from './modules/bookings/tailor-made-tour-booking/tailor-made-tour-booking.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 6 * 1000,
        limit: 5,
      }
    ]),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    IdentityModule,
    FileUploadModule,
    TourModule,
    DestinationsModule,
    HotelsModule,
    ReviewsModule,
    BlogsModule,
    GalleryModule,
    ExperiencesModule,
    TourBookingModule,
    TailorMadeTourBookingModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
