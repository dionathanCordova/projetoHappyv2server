import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanage1602956183459 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "orphanages",
            columns: [
               {
                  name: "id",
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
               },
               {
                  name: 'name',
                  type: 'varchar',
               },
               {
                  name: 'latitude',
                  type: 'decimal',
                  // scale: 2,
                  // precision: 10
               },
               {
                  name: 'longitude',
                  type: 'decimal',
                  // scale: 2,
                  // precision: 10
               },
               {
                  name: 'about',
                  type: 'text'
               },
               {
                  name: 'instruction',
                  type: 'text'
               },
               {
                  name: 'opening_hours',
                  type: 'varchar'
               },
               {
                  name: 'open_on_weekends',
                  type: 'boolean',
                  default: false
               },
               {
                  name: 'isConfirm',
                  type: 'boolean',
                  default: false
               },
               {
                  name: 'user_id',
                  type: 'uuid'
               },
            ],
            foreignKeys: [
               {
                  name: 'UserOrphanage',
                  columnNames: ['user_id'],
                  referencedTableName: 'users',
                  referencedColumnNames: ['id'],
                  onDelete: 'SET NULL',
                  onUpdate: 'CASCADE'
               }
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orphanages')
   }

}
