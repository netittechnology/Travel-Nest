import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from './entities/destination.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UserEntity } from '../identity/entities/user.entity';
import { FindDestinationQueryDto } from './dto/find-destination-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
    private readonly logger = new Logger(DestinationsService.name);

    constructor(
        @InjectRepository(Destination)
        private readonly destinationRepository: Repository<Destination>,

        private readonly fileUploadService: FileUploadService,
    ) {}

    async findDestinationById(des_id: number): Promise<Destination> {
        const destination = await this.destinationRepository
            .createQueryBuilder('destination')
            .leftJoin('destination.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('destination.id = :id', { id: des_id})
            .getOne();

        if (!destination) {
            throw new NotFoundException('Destination not found');
        }

        return destination;
    }

    async createDestination(dto: CreateDestinationDto, image: Express.Multer.File, user: UserEntity): Promise<Destination> {
        const uploadedImage = await this.fileUploadService.uploadFile(
            image,
            'destination-image',
            user
        ).catch(() => {
            throw new BadRequestException('Failed to upload image');
        });

        const destination = this.destinationRepository.create({
            ...dto,
            image: uploadedImage,
        });

        return await this.destinationRepository.save(destination);
    }

    async findAllDestinations(query: FindDestinationQueryDto): Promise<PaginatedResponse<Destination>> {
        const { page = 1, limit = 10, search_term } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.destinationRepository
            .createQueryBuilder('destination')
            .leftJoin('destination.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);

        if (search_term) {
            queryBuilder.andWhere(
                '(destination.title LIKE :search OR destination.subtitle LIKE :search)',
                { search: `%${search_term}%` }
            );
        }

        const exactFilters = {
            is_available: query.is_available ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`destination.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`destination.created_at`, query.sort_order)
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

    async updateDestination(destination: Destination, dto: UpdateDestinationDto, user: UserEntity, image?: Express.Multer.File): Promise<Destination> {
        if (image) {
            const uploadedImage = await this.fileUploadService.uploadFile(
                image,
                'destination-image',
                user
            ).catch(() => {
                throw new BadRequestException('Failed to upload new tour image');
            });

            if (destination.image) {
                await this.fileUploadService.deleteFile(destination.image.id).catch((err) => {
                    // Non-fatal: new image is already saved, log and move on
                    this.logger.warn(`Failed to delete old image (ID: ${destination.image.id}): ${err.message}`);
                });
            }

            destination.image = uploadedImage;
        }

        const SCALAR_FIELDS = ['title', 'subtitle'] as const;
        for (const field of SCALAR_FIELDS) {
            if (dto[field] !== undefined) {
                (destination as any)[field] = dto[field];
            }
        }

        await this.destinationRepository.save(destination);
        return await this.findDestinationById(destination.id);
    }

    async toggleDestinationStatus(destination: Destination): Promise<Destination> {
        destination.is_available = !destination.is_available;
        await this.destinationRepository.save(destination);

        return await this.findDestinationById(destination.id);
    }

    async deleteDestination(destination: Destination): Promise<void> {
        if (destination.image) {
            await this.fileUploadService.deleteFile(destination.image.id).catch((err) => {
                this.logger.warn(`Failed to delete image (ID: ${destination.image.id}): ${err.message}`);
            });
        }

        await this.destinationRepository.remove(destination);
    }
}
