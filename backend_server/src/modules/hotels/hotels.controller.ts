import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Hotel as HotelEntity} from './entities/hotel.entity';
import { FindHotelsQueryDto } from './dto/find-hotels-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { HotelExistsPipe } from './pipes/hotel-exists.pipe';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
    constructor(
        private readonly hotelService: HotelsService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FilesInterceptor('files', 10))
    async createHotel(
        @Body() dto: CreateHotelDto,
        @CurrentUser() user: UserEntity,
        @UploadedFiles(
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
        ) files: Express.Multer.File[]
    ): Promise<HotelEntity> {
        return await this.hotelService.createHotel(dto, files, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllHotels(
        @Query() query: FindHotelsQueryDto,
    ): Promise<PaginatedResponse<HotelEntity>> {
        return await this.hotelService.findAllHotels(query);
    }

    @Get(':hotel_id')
    @HttpCode(HttpStatus.OK)
    async getHotelById(
        @Param('hotel_id', ParseIntPipe, HotelExistsPipe) hotel: HotelEntity,
    ): Promise<HotelEntity> {
        return hotel;
    }

    @Put(':hotel_id/toggle-status')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleHotelStatus(
        @Param('hotel_id', ParseIntPipe, HotelExistsPipe) hotel: HotelEntity,
    ): Promise<HotelEntity> {
        return await this.hotelService.toggleHotelStatus(hotel);
    }

    @Put(':hotel_id/update-data')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FilesInterceptor('files', 10))
    async updateHotel(
        @Body() dto: UpdateHotelDto,
        @CurrentUser() user: UserEntity,
        @Param('hotel_id', ParseIntPipe, HotelExistsPipe) hotel: HotelEntity,
        @UploadedFiles(
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
        ) files: Express.Multer.File[]
    ): Promise<HotelEntity> {
        return await this.hotelService.updateHotel(hotel, user, dto, files);
    }

    @Delete(':hotel_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteHotel(
        @Param('hotel_id', ParseIntPipe, HotelExistsPipe) hotel: HotelEntity,
    ): Promise<void> {
        await this.hotelService.deleteHotel(hotel);
    }
}
