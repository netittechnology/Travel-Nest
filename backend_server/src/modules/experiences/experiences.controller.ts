import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Experience as ExperienceEntity } from './entities/experience.entity';
import { FindExperienceQueryDto } from './dto/find-experience-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { ExperienceExistsPipe } from './pipes/exp-exists.pipe';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experiences')
export class ExperiencesController {
    constructor(
        private readonly experienceService: ExperiencesService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createExperience(
        @Body() dto: CreateExperienceDto,
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
    ): Promise<ExperienceEntity> {
        return await this.experienceService.createExperience(dto, file, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllExperiences(
        @Query() query: FindExperienceQueryDto,
    ): Promise<PaginatedResponse<ExperienceEntity>> {
        return await this.experienceService.findAllExperiences(query);
    }

    @Get(':exp_id')
    @HttpCode(HttpStatus.OK)
    async getExpById(
        @Param('exp_id', ParseIntPipe, ExperienceExistsPipe) exp: ExperienceEntity,
    ): Promise<ExperienceEntity> {
        return exp;
    }

    @Put(':exp_id/update-data')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateExperience(
        @Body() dto: UpdateExperienceDto,
        @CurrentUser() user: UserEntity,
        @Param('exp_id', ParseIntPipe, ExperienceExistsPipe) exp: ExperienceEntity,
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
        ) file: Express.Multer.File,
    ): Promise<ExperienceEntity> {
        return await this.experienceService.updateExperience(exp, dto, user, file);
    }

    @Put(':exp_id/toggle-availability')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleExperienceStatus(
        @Param('exp_id', ParseIntPipe, ExperienceExistsPipe) exp: ExperienceEntity,
    ): Promise<ExperienceEntity> {
        return await this.experienceService.toggleExperienceStatus(exp);
    }

    @Delete(':exp_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteExperience(
        @Param('exp_id', ParseIntPipe, ExperienceExistsPipe) exp: ExperienceEntity,
    ): Promise<void> {
        await this.experienceService.deleteExperience(exp);
    }
}
