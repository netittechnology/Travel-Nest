import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Gallery as GalleryEntity } from './entities/gallery.entity';
import { FindGalleriesQueryDto } from './dto/find-galleries-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { GalleryExistsPipe } from './pipes/gallery-exists.pipe';

@Controller('gallery')
export class GalleryController {
    constructor(
        private readonly galleryService: GalleryService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createTour(
        @Body() dto: CreateGalleryDto,
        @CurrentUser() user: UserEntity,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: 10 * 1024 * 1024
                })
                .addValidator(new CustomFileTypeValidator([
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                ]))
                .build({
                    fileIsRequired: true
                })
        ) file: Express.Multer.File,
    ): Promise<GalleryEntity> {
        return await this.galleryService.createGallery(dto, file, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllGalleries(
        @Query() query: FindGalleriesQueryDto,
    ): Promise<PaginatedResponse<GalleryEntity>> {
        return await this.galleryService.findAllGalleries(query);
    }

    @Put(':gallery_id/toggle-publish')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleGalleryPublished(
        @Param('gallery_id', ParseIntPipe, GalleryExistsPipe) gallery: GalleryEntity,
    ): Promise<GalleryEntity> {
        return await this.galleryService.toggleGalleryPublished(gallery);
    }

    @Delete(':gallery_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteGallery(
        @Param('gallery_id', ParseIntPipe, GalleryExistsPipe) gallery: GalleryEntity,
    ): Promise<void> {
        await this.galleryService.deleteGallery(gallery);
    }
}
