import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tour } from './entities/tour.entity';
import { Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { FileUploadService } from '../file-upload/file-upload.service';
import { UserEntity } from '../identity/entities/user.entity';
import { FindTourQueryDto } from './dto/find-tour-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class TourService {
    private readonly logger = new Logger(TourService.name);

    constructor(
        @InjectRepository(Tour)
        private readonly tourRepository: Repository<Tour>,

        private readonly fileUploadService: FileUploadService,
    ) { }

    async findTourById(tour_id: number): Promise<Tour> {
        const tour = await this.tourRepository
            .createQueryBuilder('tour')
            .leftJoin('tour.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('tour.id = :id', { id: tour_id })
            .getOne();

        if (!tour) {
            throw new NotFoundException('Tour not found');
        }

        return tour;
    }

    async createTour(dto: CreateTourDto, image: Express.Multer.File, user: UserEntity): Promise<Tour> {
        const slug = this.generateSlug(dto.title);

        const existingTour = await this.tourRepository.findOne({
            where: { slug: slug }
        });

        if (existingTour) {
            throw new ConflictException('A Tour with this title already exists');
        }

        const uploadedImage = await this.fileUploadService.uploadFile(
            image,
            'tour-image',
            user
        ).catch(() => {
            throw new BadRequestException('Failed to upload image');
        });

        if (dto.itinerary_days) {
            dto.itinerary_days = dto.itinerary_days.map((item, index) => ({
                ...item,
                day: item.day || `Day ${index + 1}`,
            }));
        }

        const tour = this.tourRepository.create({
            ...dto,
            slug: slug,
            image: uploadedImage
        });

        return await this.tourRepository.save(tour);
    }

    async findAllTours(query: FindTourQueryDto): Promise<PaginatedResponse<Tour>> {
        const { page = 1, limit = 10, search_term } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.tourRepository
            .createQueryBuilder('tour')
            .leftJoin('tour.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);

        if (search_term) {
            queryBuilder.andWhere(
                '(tour.title LIKE :search OR tour.location LIKE :search)',
                { search: `%${search_term}%` }
            );
        }

        const exactFilters = {
            is_available: query.is_available ?? undefined,
            tour_type: query.tour_type ?? undefined,
        };

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`tour.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`tour.created_at`, query.sort_order)
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

    async updateTour(tour: Tour, dto: UpdateTourDto, user: UserEntity, image?: Express.Multer.File): Promise<Tour> {
        if (dto.title !== undefined) {
            const newSlug = this.generateSlug(dto.title);

            const existingTour = await this.tourRepository.findOne({
                where: { slug: newSlug }
            });

            if (existingTour && tour.id !== existingTour.id) {
                throw new ConflictException('A Tour with this title already exists');
            }

            tour.title = dto.title;
            tour.slug = newSlug;
        }

        if (image) {
            const uploadedImage = await this.fileUploadService.uploadFile(
                image,
                'tour-image',
                user
            ).catch(() => {
                throw new BadRequestException('Failed to upload new tour image');
            });

            if (tour.image) {
                await this.fileUploadService.deleteFile(tour.image.id).catch((err) => {
                    // Non-fatal: new image is already saved, log and move on
                    this.logger.warn(`Failed to delete old image (ID: ${tour.image.id}): ${err.message}`);
                });
            }

            tour.image = uploadedImage;
        }

        const SCALAR_FIELDS = [
            'location',
            'description',
            'duration',
            'includes',
            'highlights',
            'itinerary_days',
            'tour_type',
        ] as const;

        for (const field of SCALAR_FIELDS) {
            if (dto[field] !== undefined) {
                (tour as any)[field] = dto[field];
            }
        }

        await this.tourRepository.save(tour);
        return await this.findTourById(tour.id);
    }

    async toggleTourStatus(tour: Tour): Promise<Tour> {
        tour.is_available = !tour.is_available;
        await this.tourRepository.save(tour);

        return await this.findTourById(tour.id);
    }

    async deleteTour(tour: Tour): Promise<void> {
        if (tour.image) {
            await this.fileUploadService.deleteFile(tour.image.id).catch((err) => {
                this.logger.warn(`Failed to delete image (ID: ${tour.image.id}): ${err.message}`);
            });
        }

        await this.tourRepository.remove(tour);
    }



    // helper methods
    private generateSlug(title: string): string {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
