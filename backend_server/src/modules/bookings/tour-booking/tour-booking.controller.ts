import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TourBookingService } from './tour-booking.service';
import { TourExistsPipe } from '../../tours/pipes/tour-exists.pipe';
import { Tour } from '../../tours/entities/tour.entity';
import { CreateTourBookingDto } from './dto/create-tour-booking.dto';
import { TourBooking as TourBookingEntity } from './entities/tour-booking.entity';
import { Roles } from '../../identity/auth/decorators/roles.decorator';
import { UserRole } from '../../identity/entities/user.entity';
import { JwtAuthGuard } from '../../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/auth/guards/roles.guard';
import { FindTourBookingsQueryDto } from './dto/find-tour-booking-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { TourBookingExistsPipe } from './pipes/tour-booking-exists.pipe';

@Controller('tour-booking')
export class TourBookingController {
    constructor(
        private readonly bookingService: TourBookingService,
    ) {}

    @Post(':tour_id')
    @HttpCode(HttpStatus.CREATED)
    async createBooking(
        @Param('tour_id', ParseIntPipe, TourExistsPipe) tour: Tour,
        @Body() dto: CreateTourBookingDto,
    ): Promise<TourBookingEntity> {
        return await this.bookingService.createBooking(tour, dto);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllBookings(
        @Query() query: FindTourBookingsQueryDto,
    ): Promise<PaginatedResponse<TourBookingEntity>> {
        return await this.bookingService.findAllBookings(query);
    }

    @Put(':booking_id/decline')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async declineBooking(
        @Param('booking_id', ParseIntPipe, TourBookingExistsPipe) booking: TourBookingEntity,
    ): Promise<TourBookingEntity> {
        return await this.bookingService.declineBooking(booking);
    }

    @Put(':booking_id/complete')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async completeBooking(
        @Param('booking_id', ParseIntPipe, TourBookingExistsPipe) booking: TourBookingEntity,
    ): Promise<TourBookingEntity> {
        return await this.bookingService.completeBooking(booking);
    }

}
