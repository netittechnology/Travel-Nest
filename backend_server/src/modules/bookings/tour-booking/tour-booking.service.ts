import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus, TourBooking } from './entities/tour-booking.entity';
import { Repository } from 'typeorm';
import { Tour } from '../../tours/entities/tour.entity';
import { CreateTourBookingDto } from './dto/create-tour-booking.dto';
import { FindTourBookingsQueryDto } from './dto/find-tour-booking-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';
import { BookingStatusCount } from './types/booking-status-count.type';

@Injectable()
export class TourBookingService {
    constructor(
        @InjectRepository(TourBooking)
        private readonly tourBookingRepository: Repository<TourBooking>,
    ) {}

    async findBookingById(booking_id: number): Promise<TourBooking> {
        const booking = await this.tourBookingRepository
            .createQueryBuilder('booking')
            .leftJoin('booking.tour', 'tour')
            .addSelect([
                'tour.id',
                'tour.title',
                'tour.slug',
                'tour.location',
                'tour.duration',
            ])
            .leftJoin('tour.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('booking.id = :id', { id: booking_id })
            .getOne();

        if (!booking) {
            throw new NotFoundException('Tour-booking not found');
        }

        return booking;
    }

    async createBooking(tour: Tour, dto: CreateTourBookingDto): Promise<TourBooking> {
        if (!tour.is_available) {
            throw new BadRequestException('Tour is not in active');
        }

        const booking = this.tourBookingRepository.create({
            ...dto,
            tour: tour,
            status: BookingStatus.CONFIRMED,
        });

        return await this.tourBookingRepository.save(booking);
    }

    async findAllBookings(query: FindTourBookingsQueryDto): Promise<PaginatedResponse<TourBooking>> {
        const { page = 1, limit = 10, booking_date_from, booking_date_to } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.tourBookingRepository
            .createQueryBuilder('booking')
            .leftJoin('booking.tour', 'tour')
            .addSelect([
                'tour.id',
                'tour.title',
                'tour.slug',
                'tour.location',
                'tour.duration',
            ])
            .leftJoin('tour.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);

        if (booking_date_from) {
            queryBuilder.andWhere('booking.booking_date >= :from', { from: query.booking_date_from });
        }
        if (booking_date_to) {
            queryBuilder.andWhere('booking.booking_date <= :to', { to: query.booking_date_to });
        }

        const exactFilters = {
            is_agree: query.is_agree ?? undefined,
            status: query.status ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`booking.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`booking.created_at`, query.sort_order)
            .skip(skip)
            .take(limit);

        const [items, totalItems] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);

        return {
            items,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages
            }
        };
    }

    async declineBooking(booking: TourBooking): Promise<TourBooking> {
        booking.status = BookingStatus.DECLINED;
        await this.tourBookingRepository.save(booking);

        return await this.findBookingById(booking.id);
    }

    async completeBooking(booking: TourBooking): Promise<TourBooking> {
        booking.status = BookingStatus.COMPLETED;
        await this.tourBookingRepository.save(booking);

        return await this.findBookingById(booking.id);
    }


    // helper methods
    async findBookingsCountByUser(email: string): Promise<BookingStatusCount> {
        const counts = await this.tourBookingRepository
            .createQueryBuilder('booking')
            .select('booking.status', 'status')
            .addSelect('COUNT(*)', 'count')
            .where('booking.email = :email', { email })
            .groupBy('booking.status')
            .getRawMany<{ status: BookingStatus; count: string }>();

        // getRawMany returns count as a string, so we need to parse it
        const breakdown = {
            [BookingStatus.PENDING]:   0,
            [BookingStatus.CONFIRMED]: 0,
            [BookingStatus.DECLINED]:  0,
            [BookingStatus.COMPLETED]: 0,
        };

        for (const row of counts) {
            breakdown[row.status] = parseInt(row.count, 10);
        }

        return breakdown;
    }

}
