import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UserEntity } from '../identity/entities/user.entity';
import { FindHotelsQueryDto } from './dto/find-hotels-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Files } from '../file-upload/entities/files.entity';

@Injectable()
export class HotelsService {
    constructor(
        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel>,

        private readonly fileUploadService: FileUploadService,
    ) {}

    async findHotelById(hotel_id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository
            .createQueryBuilder('hotel')
            .leftJoin('hotel.images', 'images')
            .addSelect([
                'images.id',
                'images.mime_type',
                'images.description',
                'images.url',
            ])
            .where('hotel.id = :id', { id: hotel_id})
            .getOne();

        if (!hotel) {
            throw new NotFoundException(`Hotel not found`);
        }

        return hotel;
    }

    async createHotel(dto: CreateHotelDto, images: Express.Multer.File[], user: UserEntity): Promise<Hotel> {
        const uploadedFiles = images?.length > 0
            ? await this.fileUploadService.uploadMultipleFiles(
                images, 
                `hotel-image`, 
                user
            )
            : [];

        try {
            const hotel = this.hotelRepository.create({ ...dto });
            const savedHotel = await this.hotelRepository.save(hotel);

            // Link uploaded files to the hotel
            if (uploadedFiles.length > 0) {
                await this.fileUploadService.linkFilesToHotel(uploadedFiles, savedHotel);
            }

            return await this.findHotelById(savedHotel.id);
        } catch (error) {
            if (uploadedFiles.length > 0) {
                await this.fileUploadService.deleteMultipleFiles(uploadedFiles.map(f => f.id));
            }

            throw error;
        }
    }

    async findAllHotels(query: FindHotelsQueryDto): Promise<PaginatedResponse<Hotel>> {
        const { page = 1, limit = 10, search_term } = query;
        const skip = (page - 1) * limit;

        const queryBuilder = this.hotelRepository
            .createQueryBuilder('hotel')
            .leftJoin('hotel.images', 'images')
            .addSelect([
                'images.id',
                'images.mime_type',
                'images.description',
                'images.url',
            ]);
        
        if (search_term) {
            queryBuilder.andWhere(
                '(hotel.name LIKE :search OR hotel.short_description LIKE :search OR hotel.highlight_keywords LIKE :search)',
                { search: `%${search_term}%` }
            );
        }

        const exactFilters = {
            is_available: query.is_available ?? undefined,
        }

        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`hotel.${key} = :${key}`, { [key]: value });
            }
        });

        queryBuilder
            .orderBy(`hotel.created_at`, query.sort_order)
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

    async toggleHotelStatus(hotel: Hotel): Promise<Hotel> {
        hotel.is_available = !hotel.is_available;
        await this.hotelRepository.save(hotel);

        return await this.findHotelById(hotel.id);
    }

    async updateHotel(hotel: Hotel, user: UserEntity, dto?: UpdateHotelDto, images?: Express.Multer.File[]): Promise<Hotel> {
        let uploadedFiles: Files[] = [];

        try {
            if (images && images?.length > 0) {
                // Delete existing images
                if (hotel.images.length > 0) {
                    await this.fileUploadService.deleteMultipleFiles(hotel.images.map(f => f.id));
                }


                // Upload new images
                uploadedFiles = await this.fileUploadService.uploadMultipleFiles(
                    images,
                    `hotel-image`,
                    user
                );

                await this.fileUploadService.linkFilesToHotel(uploadedFiles, hotel);
            }

            if (dto) {
                Object.assign(hotel, dto);
                await this.hotelRepository.save(hotel);
            }

            return await this.findHotelById(hotel.id);
        } catch (error) {
            if (uploadedFiles.length > 0) {
                await this.fileUploadService.deleteMultipleFiles(uploadedFiles.map(f => f.id));
            }

            throw error;
        }
    }

    async deleteHotel(hotel: Hotel): Promise<void> {
        if (hotel.images.length > 0) {
            await this.fileUploadService.deleteMultipleFiles(
                hotel.images.map(f => f.id)
            ).catch(() => {
                throw new BadRequestException('Failed to delete images');
            });
        }

        await this.hotelRepository.remove(hotel);
    }
}
