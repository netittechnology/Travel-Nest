import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TailorMadeTourBookingService } from './tailor-made-tour-booking.service';
import { CreateTailorMadeBookingDto } from './dto/create-tailor-made-booking.dto';
import { TailorMadeBooking as TailorMadeBookingEntity } from './entities/tailor-made-bookings.entity';
import { TailorMadeBookingExistsPipe } from './pipes/tailor-made-booking-exists.pipe';
import { UpdateTailorMadeBookingStep2Dto, UpdateTailorMadeBookingStep3Dto, UpdateTailorMadeBookingStep4Dto } from './dto/update-tailor-made-booking.dto';
import { Roles } from '../../identity/auth/decorators/roles.decorator';
import { UserRole } from '../../identity/entities/user.entity';
import { JwtAuthGuard } from '../../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/auth/guards/roles.guard';
import { FindTailorMadeBookingsQueryDto } from './dto/find-tailor-made-bookings-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';

@Controller('tailor-made-tour-booking')
export class TailorMadeTourBookingController {
    constructor(
        private readonly tailorMadeBookingService: TailorMadeTourBookingService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async createBooking_Step1(
        @Body() dto: CreateTailorMadeBookingDto,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.createBooking_Step1(dto);
    }

    @Put(':booking_id/step-2')
    @HttpCode(HttpStatus.OK)
    async createBooking_Step2(
        @Param('booking_id', ParseIntPipe, TailorMadeBookingExistsPipe) booking: TailorMadeBookingEntity,
        @Body() dto: UpdateTailorMadeBookingStep2Dto,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.createBooking_Step2(booking, dto);
    }

    @Put(':booking_id/step-3')
    @HttpCode(HttpStatus.OK)
    async createBooking_Step3(
        @Param('booking_id', ParseIntPipe, TailorMadeBookingExistsPipe) booking: TailorMadeBookingEntity,
        @Body() dto: UpdateTailorMadeBookingStep3Dto,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.createBooking_Step3(booking, dto);
    }

    @Put(':booking_id/step-4')
    @HttpCode(HttpStatus.OK)
    async createBooking_Step4(
        @Param('booking_id', ParseIntPipe, TailorMadeBookingExistsPipe) booking: TailorMadeBookingEntity,
        @Body() dto: UpdateTailorMadeBookingStep4Dto,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.createBooking_Step4(booking, dto);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getAllBookings(
        @Query() query: FindTailorMadeBookingsQueryDto,
    ): Promise<PaginatedResponse<TailorMadeBookingEntity>> {
        return await this.tailorMadeBookingService.findAllBookings(query);
    }

    @Get(':booking_id')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getBookingById(
        @Param('booking_id', ParseIntPipe) booking_id: number,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.findTailorMadeBookingById(booking_id);
    }

    @Put(':booking_id/read')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async readBooking(
        @Param('booking_id', ParseIntPipe, TailorMadeBookingExistsPipe) booking: TailorMadeBookingEntity,
    ): Promise<TailorMadeBookingEntity> {
        return await this.tailorMadeBookingService.readBooking(booking);
    }

}
