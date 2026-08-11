import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './entities/files.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { UserEntity } from '../identity/entities/user.entity';
import { Hotel } from '../hotels/entities/hotel.entity';

@Injectable()
export class FileUploadService {
    private readonly logger = new Logger(FileUploadService.name);

    constructor(
        @InjectRepository(Files)
        private readonly fileRepository: Repository<Files>,

        private readonly cloudinaryService: CloudinaryService,
    ) {}

    async uploadFile(file: Express.Multer.File, description: string | undefined, user: UserEntity): Promise<Files> {
        this.logger.log(`Uploading file: ${file.originalname} (${file.mimetype}, ${file.size} bytes) by user ${user.id}`);
        
        try {
            const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);

            const newFile = this.fileRepository.create({
                original_name: file.originalname,
                mime_type: file.mimetype,
                size: file.size,
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
                description,
                uploader: user,
            });

            const savedFile = await this.fileRepository.save(newFile);
            this.logger.log(`Successfully uploaded file: ${file.originalname} with ID: ${newFile.id}`);
            
            return savedFile;
        } catch (error) {
            this.logger.error(`Failed to upload file: ${file.originalname}`, (error as Error).stack);
            throw error;
        }
    }

    async deleteFile(file_id: string): Promise<void> {
        this.logger.log(`Attempting to delete file with ID: ${file_id}`);
        
        try {
            const fileToBeDeleted = await this.fileRepository.findOne({
                where: { id: file_id.trim() }
            });

            if (!fileToBeDeleted) {
                this.logger.warn(`File with ID ${file_id} not found`);
                throw new NotFoundException(`File with ID ${file_id} not found`);
            }

            await this.cloudinaryService.deleteFile(fileToBeDeleted.public_id);
            await this.fileRepository.remove(fileToBeDeleted);
            
            this.logger.log(`Successfully deleted file: ${fileToBeDeleted.original_name} (ID: ${file_id})`);
        } catch (error) {
            this.logger.error(`Failed to delete file with ID: ${file_id}`, (error as Error).stack);
            throw error;
        }
    }

    async uploadMultipleFiles(files: Express.Multer.File[], description: string | undefined, user: UserEntity): Promise<Files[]> {
        const uploadedPublicIds: string[] = [];
    
        try {
            this.logger.log(`Starting upload of ${files.length} file(s)`);

            const uploadPromises = files.map(async (file) => {
                const cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
                uploadedPublicIds.push(cloudinaryResponse.public_id);

                const newFile = this.fileRepository.create({
                    original_name: file.originalname,
                    mime_type: file.mimetype,
                    size: file.size,
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                    description,
                    uploader: user,
                });

                return newFile;
            });

            const uploadedFiles = await Promise.all(uploadPromises);
            const savedFiles = await this.fileRepository.save(uploadedFiles);
            
            this.logger.log(`Successfully uploaded ${savedFiles.length} file(s)`);
            return savedFiles;
        } catch (error) {
            this.logger.error(`File upload failed. Rolling back ${uploadedPublicIds.length} file(s)`, (error as Error).stack);

            // Rollback: Delete all uploaded files from Cloudinary
            if (uploadedPublicIds.length > 0) {
                await Promise.all(
                    uploadedPublicIds.map(publicId => 
                        this.cloudinaryService.deleteFile(publicId).catch(err => {
                            this.logger.error(`Failed to delete ${publicId} during rollback`, err.stack);
                        })
                    )
                );
                this.logger.warn(`Rolled back ${uploadedPublicIds.length} file(s) from Cloudinary`);
            }
            
            throw error;
        }
    }

    async deleteMultipleFiles(file_ids: string[]): Promise<void> {
        this.logger.log(`Deleting ${file_ids.length} file(s)`);
        
        try {
            for (const file_id of file_ids) {
                await this.deleteFile(file_id);
            }
            
            this.logger.log(`Successfully deleted ${file_ids.length} file(s)`);
        } catch (error) {
            this.logger.error(`Failed to delete multiple files`, (error as Error).stack);
            throw error;
        }
    }


    // helper methods
    async linkFilesToHotel(files: Files[], hotel: Hotel): Promise<void> {
        await this.fileRepository.save(
            files.map(file => ({ ...file, hotel }))
        );
    }
}
