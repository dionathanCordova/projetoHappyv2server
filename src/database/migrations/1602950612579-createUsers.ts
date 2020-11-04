import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class createUsers1602950612579 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
      await queryRunner.createTable(
         new Table({
            name: 'users',
            columns: [
               {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
               },
               {
                  name: 'name',
                  type: 'varchar'
               },
               {
                  name: 'avatar',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'whatsapp',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'email',
                  type: 'varchar',
               },
               {
                  name: 'password',
                  type: 'varchar',
               },
               {
                  name: 'password_reset_token',
                  type: 'varchar',
                  isNullable: true,
               },
               {
                  name: 'password_reset_expires',
                  type: 'timestamp with time zone',
                  isNullable: true,
               },
               {
                  name: 'isAdmin',
                  type: 'boolean',
                  default: false
               },
               {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
               },
               {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
               },
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users')
    }
}
