import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { TourService } from '../tour.service';

@Injectable()
export class TourExistsPipe implements PipeTransform {
    constructor(
        private readonly tourService: TourService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.tourService.findTourById(value);
    }
}
