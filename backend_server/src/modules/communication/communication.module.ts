import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { NodemailerModule } from './nodemailer/nodemailer.module';

@Module({
  imports: [NodemailerModule],
  providers: [CommunicationService],
  exports: [CommunicationService]
})
export class CommunicationModule {}
