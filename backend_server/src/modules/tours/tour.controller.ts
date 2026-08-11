import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TourService } from './tour.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateTourDto } from './dto/create-tour.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Tour as TourEntity } from './entities/tour.entity';
import { FindTourQueryDto } from './dto/find-tour-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { TourExistsPipe } from './pipes/tour-exists.pipe';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tours')
export class TourController {
    constructor(
        private readonly tourService: TourService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createTour(
        @Body() dto: CreateTourDto,
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
    ): Promise<TourEntity> {
        return await this.tourService.createTour(dto, file, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllTours(
        @Query() query: FindTourQueryDto,
    ): Promise<PaginatedResponse<TourEntity>> {
        return await this.tourService.findAllTours(query);
    }

    @Get(':tour_id')
    @HttpCode(HttpStatus.OK)
    async getTourById(
        @Param('tour_id', ParseIntPipe, TourExistsPipe) tour: TourEntity
    ): Promise<TourEntity> {
        return tour;
    }

    @Put(':tour_id/update-data')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateTour(
        @Param('tour_id', ParseIntPipe, TourExistsPipe) tour: TourEntity,
        @Body() dto: UpdateTourDto,
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
                    fileIsRequired: false
                })
        ) file?: Express.Multer.File,
    ): Promise<TourEntity> {
        return await this.tourService.updateTour(tour, dto, user, file);
    }

    @Put(':tour_id/toggle-availability')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleTourStatus(
        @Param('tour_id', ParseIntPipe, TourExistsPipe) tour: TourEntity,
    ): Promise<TourEntity> {
        return await this.tourService.toggleTourStatus(tour);
    }

    @Delete(':tour_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteTour(
        @Param('tour_id', ParseIntPipe, TourExistsPipe) tour: TourEntity,
    ): Promise<void> {
        await this.tourService.deleteTour(tour);
    }
    
}
