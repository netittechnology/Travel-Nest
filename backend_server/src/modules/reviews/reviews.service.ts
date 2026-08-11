import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { FindReviewsQueryDto } from './dto/find-reviews-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { TourBookingService } from '../bookings/tour-booking/tour-booking.service';
import { BookingStatus } from '../bookings/tour-booking/entities/tour-booking.entity';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,

        private readonly tourBookingsService: TourBookingService,
    ) {}

    async findReviewById(review_id: number): Promise<Review> {
        const review = await this.reviewRepository.findOne({
            where: { id: review_id }
        });

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        return review;
    }

    async createReview(dto: CreateReviewDto): Promise<Review> {
        // const result = await this.tourBookingsService.findBookingsCountByUser(dto.author_email);

        // if (result[BookingStatus.COMPLETED] === 0) {
        //     throw new ForbiddenException('You must have at least one completed booking to leave a review');
        // }

        const review = this.reviewRepository.create({ 
            ...dto,
            is_approved: false,
        });

        return await this.reviewRepository.save(review);
    }

    async findAllReviews(query: FindReviewsQueryDto): Promise<PaginatedResponse<Review>> {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.reviewRepository
            .createQueryBuilder('review');

        const exactFilters = {
            is_approved: query.is_approved ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`review.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`review.created_at`, query.sort_order)
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

    async toggleReviewApprove(review: Review): Promise<Review> {
        review.is_approved = !review.is_approved;
        return await this.reviewRepository.save(review);
    }

    async deleteReview(review: Review): Promise<void> {
        await this.reviewRepository.remove(review);
    }
}
