import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TourBookingService } from '../tour-booking.service';

@Injectable()
export class TourBookingExistsPipe implements PipeTransform {
    constructor(
        private readonly tourBookingService: TourBookingService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.tourBookingService.findBookingById(value);
    }
}
