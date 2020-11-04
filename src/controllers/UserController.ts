import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import UserView from '../views/user_view';

export default class UserController {
   public async index(request: Request, response: Response): Promise<Response> {
      const userRepository = getRepository(User);

      const users = await userRepository.find();

      if(users) {
         return response.json(UserView.renderMany(users));   
      }

      return response.json(users);
   }

   public async create(request: Request, response: Response): Promise<Response> {
      try {
         const { name, email, password, confirm_password } = request.body;
         const createUserService = new CreateUserService();
         
         let rep ;
         await createUserService.execute({name, email, password, confirm_password}).then(response => {
            console.log('response: ' + response);
            rep = {status : 'ok', message : 'ok', data: response.data};
         }).catch(err => {
            rep = {status : 'erro', message: err.message};
         });
         
         return response.json(rep);
         
      } catch (error) {
         return response.status(404).json({status: 'erro', message: error.message});
      }
   }

   public async findUserById(request: Request, response: Response): Promise<Response> {
      const { id } = request.params

      const userRepository = getRepository(User);

      const user = await userRepository.findOne(id);

      if(user) {
         const renderUser = UserView.render(user);
         return response.json(renderUser);
      }

      return response.status(404).json({message: 'user does not exists'})
   }
}