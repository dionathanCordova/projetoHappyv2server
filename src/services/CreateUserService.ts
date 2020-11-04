import { hash } from 'bcryptjs'
import { getRepository } from "typeorm"
import UserModel from "../models/User"

interface IUserDTO {
   name: string;
   email: string;
   password: string;
   confirm_password: string;
}

export default class CreateUserService {
   public async execute({name, email, password, confirm_password}: IUserDTO) : Promise<any> {
      const userRepository = getRepository(UserModel);

      if(!name || !email || !password) {
         throw new Error("All fields are required");
      }

      if(password !== confirm_password) {
         throw new Error("Password does not match");
      }

      const findSameEmail = await userRepository.findOne({
         where: {
            email
         }
      })

      if(findSameEmail) {
         throw new Error("Email already in use");
      }

      const user = userRepository.create({
         name,
         email,
         password: await hash(password, 8)
      })

      await userRepository.save(user);

      if(user) {
         return {'status': 'ok', 'statusCode' : 200};
      }else{
         return {'status': 'ok', 'statusCode' : 401};
      }
   }
}