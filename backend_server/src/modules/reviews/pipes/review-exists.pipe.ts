import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ReviewsService } from '../reviews.service';

@Injectable()
export class ReviewExistsPipe implements PipeTransform {
    constructor(
        private readonly reviewService: ReviewsService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.reviewService.findReviewById(value);
    }
}
