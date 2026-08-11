import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ExperiencesService } from '../experiences.service';

@Injectable()
export class ExperienceExistsPipe implements PipeTransform {
    constructor(
        private readonly expService: ExperiencesService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.expService.findExperienceById(value);
    }
}
