import { getRepository } from "typeorm";
import UserModel from "../models/User";
import path from 'path';
import GmailProvider from '../providers/MailProvider/implementations/GmailProvider';
import { hash } from 'bcryptjs';
import { request } from "express";

interface IForgotPassDTO {
   email: string
}

export default class CreateForgotPassService {
   public async execute({ email }: IForgotPassDTO): Promise<void> {

      const userRepository = getRepository(UserModel);

      const user = await userRepository.findOne({
         where: { email }
      });

      if (!user) {
         throw new Error('User does not existis');
      };

      const newPassword = Math.random().toString(36).slice(-8);
      const hashedPass = await hash(newPassword, 8);
      console.log(newPassword, hashedPass);

      user.password = hashedPass;
      await userRepository.save(user);

      const forgotPasswordTemplate = path.resolve(__dirname, '..', 'template', 'forgot_password.hbs');

      const emailData = {
         to: {
            name: user.name,
            email: user.email
         },
         subject: 'Recuperação de senha',
         templateData: {
            file: forgotPasswordTemplate,
            variables: {
               name: user.name,
               password: newPassword
            }
         }
      }

      const sendEmail = new GmailProvider();
      const respEmail = await sendEmail.sendMail(emailData);
   }
}