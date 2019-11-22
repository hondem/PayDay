import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex.raw(`
    INSERT INTO m.osoba VALUES 
    (1,'1','Ludovít',' ','Burger   ',' ','t','konateľ',' ',' ',' ','100',' ',' ',' ',' ',' ','rc','05.06.1962','M','SK','Ilava','Z','OP','PAS','ulica','c','c','01851','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2009','01.12.2099',' '),
    (2,'2','Martina',' ','Burgerova',' ','t','asisten',' ',' ',' ','100',' ',' ',' ',' ',' ','rc','05.05.1968','F','SK','Ilava','Z','OP','PAS','ulica','c','c','01581','Ilava','okres','kraj','stat','ulica','c','c','psc','mesto','okr','kraj','stat','01.01.2010','01.12.2099',' ');
  `);
};
