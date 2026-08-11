import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TailorMadeBooking } from './entities/tailor-made-bookings.entity';
import { Repository } from 'typeorm';
import { CreateTailorMadeBookingDto } from './dto/create-tailor-made-booking.dto';
import { UpdateTailorMadeBookingStep2Dto, UpdateTailorMadeBookingStep3Dto, UpdateTailorMadeBookingStep4Dto } from './dto/update-tailor-made-booking.dto';
import { FindTailorMadeBookingsQueryDto } from './dto/find-tailor-made-bookings-query.dto';
import { PaginatedResponse } from '../../../common/interfaces/paginated-response.interface';

@Injectable()
export class TailorMadeTourBookingService {
    constructor(
        @InjectRepository(TailorMadeBooking)
        private readonly tailorMadeBookingRepository: Repository<TailorMadeBooking>,
    ) {}

    async findTailorMadeBookingById(booking_id: number): Promise<TailorMadeBooking> {
        const booking = await this.tailorMadeBookingRepository.findOne({
            where: { id: booking_id }
        });

        if (!booking) {
            throw new NotFoundException('Tailor made booking not found');
        }

        return booking;
    }

    async createBooking_Step1(dto: CreateTailorMadeBookingDto): Promise<TailorMadeBooking> {
        const booking = this.tailorMadeBookingRepository.create({ ...dto });
        return await this.tailorMadeBookingRepository.save(booking);
    }

    async createBooking_Step2(booking: TailorMadeBooking, dto: UpdateTailorMadeBookingStep2Dto): Promise<TailorMadeBooking> {
        if (new Date(dto.end_date) <= new Date(dto.start_date)) {
            throw new BadRequestException('End date must be after start date');
        }

        if (booking.create_step !== 1) {
            throw new BadRequestException(`Invalid form step. You are in step - ${booking.create_step}`);
        }
        
        Object.assign(booking, dto);
        booking.create_step = 2;

        return await this.tailorMadeBookingRepository.save(booking);
    }

    async createBooking_Step3(booking: TailorMadeBooking, dto: UpdateTailorMadeBookingStep3Dto): Promise<TailorMadeBooking> {
        if (booking.create_step !== 2) {
            throw new BadRequestException(`Invalid form step. You are in step - ${booking.create_step}`);
        }

        Object.assign(booking, dto);
        booking.create_step = 3;

        return await this.tailorMadeBookingRepository.save(booking);
    }

    async createBooking_Step4(booking: TailorMadeBooking, dto: UpdateTailorMadeBookingStep4Dto): Promise<TailorMadeBooking> {
        if (booking.create_step !== 3) {
            throw new BadRequestException(`Invalid form step. You are in step - ${booking.create_step}`);
        }

        Object.assign(booking, dto);
        booking.create_step = 4;
        booking.is_completed = true;
        
        return await this.tailorMadeBookingRepository.save(booking);
    }

    async findAllBookings(query: FindTailorMadeBookingsQueryDto): Promise<PaginatedResponse<TailorMadeBooking>> {
        const { page = 1, limit = 10, booking_date_from, booking_date_to } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.tailorMadeBookingRepository
            .createQueryBuilder('booking');

        if (booking_date_from) {
            queryBuilder.andWhere('booking.start_date >= :from', { from: query.booking_date_from });
        }
        if (booking_date_to) {
            queryBuilder.andWhere('booking.start_date <= :to', { to: query.booking_date_to });
        }

        const exactFilters = {
            is_agree: query.is_agree ?? undefined,
            is_read: query.is_read ?? undefined,
            travel_style: query.travel_style ?? undefined,
            experience_type: query.experience_type ?? undefined,
            vehicle_preference: query.vehicle_preference ?? undefined,
            how_know_us: query.how_know_us ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`booking.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .andWhere('booking.is_completed = :value', { value: true })
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

    async readBooking(booking: TailorMadeBooking): Promise<TailorMadeBooking> {
        booking.is_read = true;
        return await this.tailorMadeBookingRepository.save(booking);
    }
}
