import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UserEntity } from '../identity/entities/user.entity';
import { FindGalleriesQueryDto } from './dto/find-galleries-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';

@Injectable()
export class GalleryService {
    private readonly logger = new Logger(GalleryService.name);

    constructor(
        @InjectRepository(Gallery)
        private readonly galleryRepository: Repository<Gallery>,

        private readonly fileUploadService: FileUploadService,
    ) {}

    async findGalleryById(gallery_id: number): Promise<Gallery> {
        const gallery = await this.galleryRepository
            .createQueryBuilder('gallery')
            .leftJoin('gallery.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('gallery.id = :id', { id: gallery_id })
            .getOne();

        if (!gallery) {
            throw new NotFoundException('Gallery not found');
        }

        return gallery;
    }

    async createGallery(dto: CreateGalleryDto, image: Express.Multer.File, user: UserEntity): Promise<Gallery> {
        const uploadedImage = await this.fileUploadService.uploadFile(
            image,
            'gallery-image',
            user
        ).catch(() => {
            throw new BadRequestException('Failed to upload gallery image');
        });

        const gallery = this.galleryRepository.create({
            ...dto,
            image: uploadedImage,
        });

        return await this.galleryRepository.save(gallery);
    }

    async findAllGalleries(query: FindGalleriesQueryDto): Promise<PaginatedResponse<Gallery>> {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.galleryRepository
            .createQueryBuilder('gallery')
            .leftJoin('gallery.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);

        const exactFilters = {
            category: query.category ?? undefined,
            is_published: query.is_published ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`gallery.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`gallery.created_at`, query.sort_order)
            .skip(skip)
            .take(limit);

        const [items, totalItems] = await queryBuilder.getManyAndCount();
        const totalPages = Math.ceil(totalItems / limit);

        return {
            items,
            meta: {
                currentPage: page,
                itemsPerPage: limit,
                totalItems,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages
            }
        };
    }

    async toggleGalleryPublished(gallery: Gallery): Promise<Gallery> {
        gallery.is_published = !gallery.is_published;
        await this.galleryRepository.save(gallery);

        return await this.findGalleryById(gallery.id);
    }

    async deleteGallery(gallery: Gallery): Promise<void> {
        if (gallery.image) {
            await this.fileUploadService.deleteFile(gallery.image.id).catch((err) => {
                this.logger.warn(`Failed to delete image (ID: ${gallery.image.id}): ${err.message}`);
            });
        }

        await this.galleryRepository.remove(gallery);
    }
}
