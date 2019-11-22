import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex.raw(`
  INSERT INTO m.udaje 
  VALUES 
   (2,'2019.01.01','H','0','0',1,100.0,'P','A','A','N','N','N','2','0','0','0','0',0,0,'0','A',25,'A','A','A','A','A','A','A','A','N'),
   (1,'2018.12.01','H','0','0',1,100.0,'P','A','A','N','N','N','2','0','0','0','0',1,1,'0','A','25','A','A','A','A','A','A','A','A','N');
  `);
};
