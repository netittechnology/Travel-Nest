import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { GalleryService } from '../gallery.service';

@Injectable()
export class GalleryExistsPipe implements PipeTransform {
    constructor(
        private readonly galleryService: GalleryService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.galleryService.findGalleryById(value);
    }
}
