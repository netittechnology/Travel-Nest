import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HotelsService } from '../hotels.service';

@Injectable()
export class HotelExistsPipe implements PipeTransform {
    constructor(
        private readonly hotelService: HotelsService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.hotelService.findHotelById(value);
    }
}
