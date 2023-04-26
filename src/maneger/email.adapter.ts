import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class EmailAdapter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async sendEmail(email: string, subject: string, conformationCode: string) {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '200920092022august@gmail.com', //тут емейл в ""
        pass: 'indybjghnvagxyxe', //тут пароль в ""
      },
    });
    const info = await transport.sendMail({
      from: `"Lora" <200920092022august@gmail.com>`,
      to: email,
      subject: subject,
      text: `https://some-front.com/confirm-registration?code=${conformationCode}`,
    });
    return;
  }

  async resendEmail(email: string, subject: string, message: string) {
    console.log(nodemailer);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '200920092022august@gmail.com', // generated ethereal user
        pass: 'indybjghnvagxyxe', // generated ethereal password
      },
    });
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <200920092022august@gmail.com>',
      to: email,
      subject: subject,
      html: message,
    });
    return info;
  }
}
