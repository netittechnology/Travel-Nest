import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TailorMadeTourBookingService } from '../tailor-made-tour-booking.service';

@Injectable()
export class TailorMadeBookingExistsPipe implements PipeTransform {
    constructor(
        private readonly tailorMadeBookingService: TailorMadeTourBookingService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.tailorMadeBookingService.findTailorMadeBookingById(value);
    }
}
