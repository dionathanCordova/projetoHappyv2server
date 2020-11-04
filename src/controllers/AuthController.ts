import { Request, Response } from 'express';

import CreateAuthService from '../services/CreateAuthService';

export default class AuthController {
   public async create(request: Request, response: Response): Promise<Response> {
      try {
         const { email, password } = request.body;
         const authService = new CreateAuthService();
         const {user, token} = await authService.execute({email, password});

         return response.json({user, token, status: 200});

      } catch (error) {
         return response.status(403).json({message2: error.message})
      }
   }
}