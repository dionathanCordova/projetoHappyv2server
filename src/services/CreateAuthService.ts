import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from "typeorm";
import UserModel from "../models/User";
import UserView from '../views/user_view';

interface IAuthDTO {
   email: string;
   password: string;
}

export default class CreateAuthService {
   public async execute({ email, password }: IAuthDTO): Promise<any> {
      try {
         const userRepository = getRepository(UserModel)

         const user = await userRepository.findOne({
            where: { email }
         });

         if (!user) {
            throw new Error('Credentials dont match');
         }

         const comparePass = await compare(password, user?.password);

         if (!comparePass) {
            throw new Error('Credentials not match');
         }

         const accessToken = process.env.JWT_ACCESS_TOKEN_SECRET;
         const token = sign({}, `${accessToken}`, {
            subject: user.id,
            expiresIn: '1d'
         })

         return { 'user': UserView.render(user), 'token': token };
      } catch (error) {
         return {status : 'erro', message : error.message}
      }
   }
}