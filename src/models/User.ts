import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Orphanages from "./Orphanages";

@Entity('users')
export default class UserModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column()
   avatar: string;

   @Column()
   whatsapp: string;

   @Column()
   email: string;

   @Column()
   password: string;

   @Column()
   password_reset_token: string;

   @UpdateDateColumn()
   password_reset_expires: Date

   @Column()
   isAdmin: boolean

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   @OneToMany(() => Orphanages, orphanage => orphanage.user, {
      cascade: ['insert', 'update']
   })
   @JoinColumn({ name: 'user_id' })
   orphanages: Orphanages;
} 