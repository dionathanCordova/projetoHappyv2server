import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanages from '../models/Orphanages';
import UserModel from '../models/User';

interface ImageProps {
   id: string;
   url: string;
}

export default {
   async index(request: Request, response: Response) {
      const orphanagesRepository = getRepository(Orphanages);
      const orphanagesList = await orphanagesRepository.find({
         where: { isConfirm: true },
         relations: ['images']
      });

      return response.status(200).json(orphanageView.renderMany(orphanagesList));
   },

   async show(request: Request, response: Response) {
      const { id } = request.params;

      const orphanagesRepository = getRepository(Orphanages);
      const orphanagesDetail = await orphanagesRepository.findOneOrFail({
         where: { id },
         relations: ['images']
      });

      return response.status(200).json(orphanageView.render(orphanagesDetail));
   },

   async findOrphamageByUserId(request: Request, response: Response) {
      try {
         const { id, confirmed } = request.params;

         const orphanagesRepository = getRepository(Orphanages);
         const orphanage = await orphanagesRepository.find({
            where: { user_id: id, isConfirm: confirmed }
         })

         return response.status(200).json(orphanage);
      } catch (error) {
         return response.status(400).json({ status: 'erro', statusCode: 400 });
      }
   },

   async create(request: Request, response: Response) {
      try {
         const { name, latitude, longitude, about, instruction, opening_hours, open_on_weekends, isConfirm, user_id } = request.body;

         const orphanagesRepository = getRepository(Orphanages);

         const requestImages = request.files as Express.Multer.File[];

         const images = requestImages.map(image => {
            return { path: image.filename }
         })

         const data = {
            name,
            latitude,
            longitude,
            about,
            open_on_weekends: open_on_weekends === 'true',
            isConfirm: isConfirm == 'true',
            opening_hours,
            instruction,
            user: user_id,
            user_id: user_id,
            images
         };

         console.log(data);

         const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            open_on_weekends: Yup.boolean().required(),
            isConfirm: Yup.boolean().required(),
            opening_hours: Yup.string().required(),
            instruction: Yup.string().required(),
            user: Yup.string().required(),
            user_id: Yup.string().required(),
            images: Yup.array(
               Yup.object().shape({
                  path: Yup.string().required()
               })
            )
         })

         await schema.validate(data, {
            abortEarly: false
         })

         const createOrphanages = orphanagesRepository.create(data);
         await orphanagesRepository.save(createOrphanages);

         return response.status(201).json({ status: 'ok', createOrphanages });
      } catch (error) {
         return response.status(404).json({ message: error.message });
      }
   },

   async update(request: Request, response: Response) {
      try {
         const { name, latitude, longitude, about, instruction, opening_hours, open_on_weekends, orphanage_id } = request.body;

         console.log(latitude, longitude);

         const orphanagesRepository = getRepository(Orphanages);
         const orphanage = await orphanagesRepository.findOne({ id: orphanage_id });

         const requestImages = request.files as Express.Multer.File[];

         const images = requestImages.map(image => {
            return { path: image.filename }
         })

         const data = {
            name,
            latitude,
            longitude,
            about,
            instruction,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            // images,
         };

         const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            open_on_weekends: Yup.boolean().required(),
            opening_hours: Yup.string().required(),
            instruction: Yup.string().required(),
            // images: Yup.array(
            //    Yup.object().shape({
            //       path: Yup.string().required()
            //    })
            // )
         })

         await schema.validate(data, {
            abortEarly: false
         })

         if (orphanage) {
            orphanage.name = data.name;
            orphanage.latitude = data.latitude;
            orphanage.longitude = data.longitude;
            orphanage.about = data.about;
            orphanage.open_on_weekends = data.open_on_weekends;
            orphanage.opening_hours = data.opening_hours;
            orphanage.instruction = data.instruction;

            await orphanagesRepository.save(orphanage);

            return response.status(201).json({ orphanage });
         }

         return response.status(403).json({ status: 'erro', statusCode: '403' });
      } catch (error) {
         return response.status(404).json({ message: error.message });
      }
   },

   async removeOrphanage(request: Request, response: Response) {
      const { user_id, id } = request.params;

      const orphanagesRepository = getRepository(Orphanages);
      const orphanage = await orphanagesRepository.findOne({
         where: { id, user_id }
      })

      if (orphanage) {
         await orphanagesRepository.remove(orphanage);
         return response.status(201).json({ status: 'ok' })
      }

      return response.status(403).json({status: 'erro', message: 'Some error occured while remove orphanage'})
   }
}