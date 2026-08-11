import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UserEntity } from '../identity/entities/user.entity';
import { FindExperienceQueryDto } from './dto/find-experience-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
    private readonly logger = new Logger(ExperiencesService.name);

    constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,

        private readonly fileUploadService: FileUploadService,
    ) {}

    async findExperienceById(exp_id: number): Promise<Experience> {
        const experience = await this.experienceRepository
            .createQueryBuilder('experience')
            .leftJoin('experience.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('experience.id = :id', { id: exp_id })
            .getOne();

        if (!experience) {
            throw new NotFoundException('Experience not found');
        }

        return experience;
    } 

    async createExperience(dto: CreateExperienceDto, image: Express.Multer.File, user: UserEntity): Promise<Experience> {
        const normalizeCategory = dto.category.trim().toUpperCase();

        const uploadedImage = await this.fileUploadService.uploadFile(
            image,
            'experience-image',
            user
        ).catch(() => {
            throw new BadRequestException('Failed to upload image');
        });

        const experience = this.experienceRepository.create({
            ...dto,
            image: uploadedImage,
            category: normalizeCategory,
        });

        return await this.experienceRepository.save(experience);
    }

    async findAllExperiences(query: FindExperienceQueryDto): Promise<PaginatedResponse<Experience>> {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.experienceRepository
            .createQueryBuilder('experience')
            .leftJoin('experience.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);

        const exactFilters = {
            is_available: query.is_available ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`experience.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`experience.created_at`, query.sort_order)
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

    async updateExperience(experience: Experience, dto: UpdateExperienceDto, user: UserEntity, image?: Express.Multer.File): Promise<Experience> {
        if (dto.category) {
            const normalizedCategory = dto.category.trim().toUpperCase();
            experience.category = normalizedCategory;
        }

        if (image) {
            const uploadedImage = await this.fileUploadService.uploadFile(
                image,
                'experience-image',
                user
            ).catch(() => {
                throw new BadRequestException('Failed to upload new experience image');
            });

            if (experience.image) {
                await this.fileUploadService.deleteFile(experience.image.id).catch((err) => {
                    // Non-fatal: new image is already saved, log and move on
                    this.logger.warn(`Failed to delete old image (ID: ${experience.image.id}): ${err.message}`);
                });
            }

            experience.image = uploadedImage;
        }

        const SCALAR_FIELDS = ['title', 'duration', 'content', 'latitude', 'longitude'] as const;
        for (const field of SCALAR_FIELDS) {
            if (dto[field] !== undefined) {
                (experience as any)[field] = dto[field];
            }
        }

        await this.experienceRepository.save(experience);
        return await this.findExperienceById(experience.id);
    }

    async toggleExperienceStatus(experience: Experience): Promise<Experience> {
        experience.is_available = !experience.is_available;
        await this.experienceRepository.save(experience);

        return await this.findExperienceById(experience.id);
    }

    async deleteExperience(experience: Experience): Promise<void> {
        if (experience.image) {
            await this.fileUploadService.deleteFile(experience.image.id).catch((err) => {
                this.logger.warn(`Failed to delete image (ID: ${experience.image.id}): ${err.message}`);
            });
        }

        await this.experienceRepository.remove(experience);
    }
}
