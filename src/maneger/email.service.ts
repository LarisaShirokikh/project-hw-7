import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private email: string
  private password: string
  constructor(private configService: ConfigService){
    this.email = configService.get('EMAIL_USERNAME')
    this.password = configService.get('EMAIL_PASSWORD')
  }
  async sendConfirmationEmail(
    email: string,
    confirmationCode: string,
  ): Promise<void> {
    log(this.email, this.password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.email,
        pass: this.password,
      },
    
    });

    const mailOptions = {
      from: 'Your App <yourapp@example.com>',
      to: email,
      subject: 'Confirm your email',
      text: `Your confirmation code is ${confirmationCode}.`,
    };

    log('before')
    const result = await transporter.sendMail(mailOptions);
    log('after')
    log(result)
    return
  }
}
