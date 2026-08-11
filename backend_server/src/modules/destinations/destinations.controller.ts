import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Destination as DestinationEntity } from './entities/destination.entity';
import { FindDestinationQueryDto } from './dto/find-destination-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { DestinationExistsPipe } from './pipes/destination-exists.pipe';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Controller('destinations')
export class DestinationsController {
    constructor(
        private readonly destinationService: DestinationsService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createDestination(
        @Body() dto: CreateDestinationDto,
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
    ): Promise<DestinationEntity> {
        return await this.destinationService.createDestination(dto, file, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllDestinations(
        @Query() query: FindDestinationQueryDto,
    ): Promise<PaginatedResponse<DestinationEntity>> {
        return await this.destinationService.findAllDestinations(query);
    }

    @Get(':destination_id')
    @HttpCode(HttpStatus.OK)
    async getDestinationById(
        @Param('destination_id', ParseIntPipe, DestinationExistsPipe) destination: DestinationEntity,
    ): Promise<DestinationEntity> {
        return destination;
    }

    @Put(':destination_id/update-data')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateDestination(
        @Param('destination_id', ParseIntPipe, DestinationExistsPipe) destination: DestinationEntity,
        @Body() dto: UpdateDestinationDto,
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
        ) file?: Express.Multer.File
    ): Promise<DestinationEntity> {
        return await this.destinationService.updateDestination(destination, dto, user, file);
    }

    @Put(':destination_id/toggle-availability')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleDestinationStatus(
        @Param('destination_id', ParseIntPipe, DestinationExistsPipe) destination: DestinationEntity,
    ): Promise<DestinationEntity> {
        return await this.destinationService.toggleDestinationStatus(destination);
    }

    @Delete(':destination_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteDestination(
        @Param('destination_id', ParseIntPipe, DestinationExistsPipe) destination: DestinationEntity,
    ): Promise<void> {
        await this.destinationService.deleteDestination(destination);
    }
    
}
