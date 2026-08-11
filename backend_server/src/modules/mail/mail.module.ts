import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { NodemailerModule } from './nodemailer/nodemailer.module';

@Module({
  imports: [NodemailerModule],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
