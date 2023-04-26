import { Injectable } from '@nestjs/common';
import { EmailAdapter } from './email.adapter';

@Injectable()
export class EmailManager {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  async sendEmailConfirmationCode(conformationCode: string, email: string) {
    await this.emailAdapter.resendEmail(
      email,
      'Confirm your email',
      conformationCode,
    );
  }
}
