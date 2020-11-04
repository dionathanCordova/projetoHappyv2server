import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImageOrphanage1602956237071 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "images",
            columns: [
               {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  default: 'uuid_generate_v4()',
               },
               {
                  name: 'path',
                  type: 'varchar'
               },
               {
                  name: 'orphanage_id',
                  type: 'uuid'
               }
            ],
            foreignKeys: [
               {
                  name: 'imagefk',
                  columnNames: ['orphanage_id'],
                  referencedTableName: 'orphanages',
                  referencedColumnNames: ['id'],
                  onDelete: 'CASCADE',
                  onUpdate: 'CASCADE'
               }
            ]
         })
      )
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('images')
   }
}
