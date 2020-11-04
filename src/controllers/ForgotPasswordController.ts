import { Request, Response } from 'express';
import CreateForgotPassService from '../services/CreateForgotPassService';

export default class ForgotPasswordController {
   public async create(request: Request, response: Response) : Promise<Response> {
      try {
         const { email } = request.body;
   
         const forgotPassService = new CreateForgotPassService();
         const forgotPass = await forgotPassService.execute({email});
   
         return response.json({ forgotPass });
         
      } catch (error) {
         return response.json({message: error.message, status: 'erro'});
      }
   }
}