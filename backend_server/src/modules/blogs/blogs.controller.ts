import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Roles } from '../identity/auth/decorators/roles.decorator';
import { UserEntity, UserRole } from '../identity/entities/user.entity';
import { JwtAuthGuard } from '../identity/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../identity/auth/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CurrentUser } from '../identity/auth/decorators/current-user.decorator';
import { CustomFileTypeValidator } from '../../common/validators/custom-file-type.validator';
import { Blog as BlogEntity } from './entities/blog.entity';
import { FindBlogsQueryDto } from './dto/find-blogs-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { BlogExistsPipe } from './pipes/blog-exists.pipe';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
    constructor(
        private readonly blogService: BlogsService,
    ) {}

    @Post('')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async createBlog(
        @Body() dto: CreateBlogDto,
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
    ): Promise<BlogEntity> {
        return await this.blogService.createBlog(dto, file, user);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllBlogs(
        @Query() query: FindBlogsQueryDto,
    ): Promise<PaginatedResponse<BlogEntity>> {
        return await this.blogService.findAllBlogs(query);
    }

    @Get(':blog_id')
    @HttpCode(HttpStatus.OK)
    async getBlogById(
        @Param('blog_id', ParseIntPipe, BlogExistsPipe) blog: BlogEntity,
    ): Promise<BlogEntity> {
        return blog;
    }

    @Put(':blog_id/toggle-published')
    @HttpCode(HttpStatus.CREATED)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async toggleBlogPublished(
        @Param('blog_id', ParseIntPipe, BlogExistsPipe) blog: BlogEntity,
    ): Promise<BlogEntity> {
        return await this.blogService.toggleBlogPublished(blog);
    }

    @Put(':blog_id/update-data')
    @HttpCode(HttpStatus.OK)
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    async updateBlog(
        @Body() dto: UpdateBlogDto,
        @CurrentUser() user: UserEntity,
        @Param('blog_id', ParseIntPipe, BlogExistsPipe) blog: BlogEntity,
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
    ): Promise<BlogEntity> {
        return await this.blogService.updateBlog(blog, dto, user, file);
    }

    @Delete(':blog_id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteBlog(
        @Param('blog_id', ParseIntPipe, BlogExistsPipe) blog: BlogEntity,
    ): Promise<void> {
        await this.blogService.deleteBlog(blog);
    }
}
