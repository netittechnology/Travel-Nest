import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BlogsService } from '../blogs.service';

@Injectable()
export class BlogExistsPipe implements PipeTransform {
    constructor(
        private readonly blogService: BlogsService,
    ) {}

    async transform(value: number, metadata: ArgumentMetadata) {
        return await this.blogService.findBlogById(value);
    }
}
