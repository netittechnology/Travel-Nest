import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review as ReviewEntity } from './entities/review.entity';
import { FindReviewsQueryDto } from './dto/find-reviews-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { ReviewExistsPipe } from './pipes/review-exists.pipe';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewService: ReviewsService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    async createReview(
        @Body() dto: CreateReviewDto,
    ): Promise<ReviewEntity> {
        return await this.reviewService.createReview(dto);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllReviews(
        @Query() query: FindReviewsQueryDto,
    ): Promise<PaginatedResponse<ReviewEntity>> {
        return await this.reviewService.findAllReviews(query);
    }

    @Get(':review_id')
    @HttpCode(HttpStatus.OK)
    async getReviewById(
        @Param('review_id', ParseIntPipe, ReviewExistsPipe) review: ReviewEntity,
    ): Promise<ReviewEntity> {
        return review;
    }

    @Put(':review_id/toggle-approve')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleReviewApprove(
        @Param('review_id', ParseIntPipe, ReviewExistsPipe) review: ReviewEntity,
    ): Promise<ReviewEntity> {
        return await this.reviewService.toggleReviewApprove(review);
    }

    @Delete(':review_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteReview(
        @Param('review_id', ParseIntPipe, ReviewExistsPipe) review: ReviewEntity,
    ): Promise<void> {
        await this.reviewService.deleteReview(review);
    }

}
