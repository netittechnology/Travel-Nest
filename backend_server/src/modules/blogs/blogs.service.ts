import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UserEntity } from '../identity/entities/user.entity';
import { FindBlogsQueryDto } from './dto/find-blogs-query.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
    private readonly logger = new Logger(BlogsService.name);

    constructor(
        @InjectRepository(Blog)
        private readonly blogRepository: Repository<Blog>,

        private readonly fileUploadService: FileUploadService,
    ) {}

    async findBlogById(blog_id: number): Promise<Blog> {
        const blog = await this.blogRepository
            .createQueryBuilder('blog')
            .leftJoin('blog.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ])
            .where('blog.id = :id', { id: blog_id })
            .getOne();

        if (!blog) {
            throw new NotFoundException('Blog not found');
        }

        return blog;
    }

    async createBlog(dto: CreateBlogDto, image: Express.Multer.File, user: UserEntity): Promise<Blog> {
        const slug = this.generateSlug(dto.title);

        const existingBlog = await this.blogRepository.findOne({
            where: { slug: slug }
        });

        if (existingBlog) {
            throw new ConflictException('A blog with this title already exists');
        }

        const uploadedImage = await this.fileUploadService.uploadFile(
            image,
            'blog-image',
            user
        ).catch(() => {
            throw new BadRequestException('Failed to upload image');
        });

        const blog = this.blogRepository.create({
            ...dto,
            slug: slug,
            image: uploadedImage,
        });

        return await this.blogRepository.save(blog);
    }

    async findAllBlogs(query: FindBlogsQueryDto): Promise<PaginatedResponse<Blog>> {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
    
        const queryBuilder = this.blogRepository
            .createQueryBuilder('blog')
            .leftJoin('blog.image', 'image')
            .addSelect([
                'image.id',
                'image.mime_type',
                'image.description',
                'image.url',
            ]);
    
        const exactFilters = {
            is_published: query.is_published ?? undefined,
        }
    
        Object.entries(exactFilters).forEach(([key, value]) => {
            if (value !== undefined) {
                queryBuilder.andWhere(`blog.${key} = :${key}`, { [key]: value });
            }
        });
    
        queryBuilder
            .orderBy(`blog.created_at`, query.sort_order)
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

    async toggleBlogPublished(blog: Blog): Promise<Blog> {
        blog.is_published = !blog.is_published;
        await this.blogRepository.save(blog);

        return await this.findBlogById(blog.id);
    }

    async updateBlog(blog: Blog, dto: UpdateBlogDto, user: UserEntity, image?: Express.Multer.File): Promise<Blog> {
        if (dto.title !== undefined) {
            const newSlug = this.generateSlug(dto.title);
    
            const existingTour = await this.blogRepository.findOne({
                where: { slug: newSlug }
            });
    
            if (existingTour && blog.id !== existingTour.id) {
                throw new ConflictException('A blog with this title already exists');
            }
    
            blog.title = dto.title;
            blog.slug = newSlug;
        }
    
        if (image) {
            const uploadedImage = await this.fileUploadService.uploadFile(
                image,
                'blog-image',
                user
            ).catch(() => {
                throw new BadRequestException('Failed to upload new blog image');
            });
    
            if (blog.image) {
                await this.fileUploadService.deleteFile(blog.image.id).catch((err) => {
                    // Non-fatal: new image is already saved, log and move on
                    this.logger.warn(`Failed to delete old image (ID: ${blog.image.id}): ${err.message}`);
                });
            }
    
            blog.image = uploadedImage;
        }
    
        const SCALAR_FIELDS = ['excerpt', 'content', 'tags', 'meta_description', 'meta_keywords'] as const;
        for (const field of SCALAR_FIELDS) {
            if (dto[field] !== undefined) {
                (blog as any)[field] = dto[field];
            }
        }
    
        await this.blogRepository.save(blog);
        return await this.findBlogById(blog.id);
    }

    async deleteBlog(blog: Blog): Promise<void> {
        if (blog.image) {
            await this.fileUploadService.deleteFile(blog.image.id).catch((err) => {
                this.logger.warn(`Failed to delete image (ID: ${blog.image.id}): ${err.message}`);
            });
        }
    
        await this.blogRepository.remove(blog);
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
