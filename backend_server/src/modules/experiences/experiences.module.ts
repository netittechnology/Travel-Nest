import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { ExperienceExistsPipe } from './pipes/exp-exists.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Experience]),
    FileUploadModule,
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService, ExperienceExistsPipe]
})
export class ExperiencesModule {}
