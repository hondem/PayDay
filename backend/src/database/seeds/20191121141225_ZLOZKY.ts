import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.zlozky").del()
  .then(() => {
    return knex.raw(`
      INSERT INTO m.zlozky 
      VALUES 
       (1,1,2,'','2019-11-01','2099-11-02',''),
       (2,1,1,'','2019-11-15','2019-11-18',''),
       (3,1,2,'','2019-11-01','2019-11-01',''),
       (4,2,1,'','2019-11-16','2019-11-18',''),
       (5,2,2,'','2018-11-18','2018-11-20','');
    `);
  });
};
