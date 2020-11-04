import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload{
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthenticate(request: Request, response: Response, next: NextFunction): void {
   const authHeader = request.headers.authorization;

   if(!authHeader) {
      throw new Error('JWT token is missing');
   }

   const [, token] = authHeader.split(' ');

   const JWTCOMPARETOKEN = process.env.JWT_ACCESS_TOKEN_SECRET;

   if(JWTCOMPARETOKEN) {
      try {
         const decode = verify(token, JWTCOMPARETOKEN);
         const { sub } = decode as TokenPayload;

         request.user = {
            id: sub
         }

         console.log(decode);
         console.log(request.user);

         return next();
      } catch (error) {
         throw new Error('Invalid JWT token');
      }
   }

}