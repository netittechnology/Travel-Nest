import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DestinationsService } from '../destinations.service';

@Injectable()
export class DestinationExistsPipe implements PipeTransform {
    constructor(
        private readonly destinationService: DestinationsService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.destinationService.findDestinationById(value);
    }
}
