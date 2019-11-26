import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.kalendar_sviatky").del()
  .then(() => {
    return knex.raw(`
      INSERT INTO m.kalendar_sviatky VALUES ('2019-01-01'),
      ('2019-01-06'),
      ('2019-04-19'),
      ('2019-04-22'),
      ('2019-05-01'),
      ('2019-05-08'),
      ('2019-07-05'),
      ('2019-08-29'),
      ('2019-11-01'),
      ('2019-11-17'),
      ('2019-12-24'),
      ('2019-12-25'),
      ('2019-12-26'),
      ('2018-01-01'),
      ('2018-01-06'),
      ('2018-12-24'),
      ('2018-12-25'),
      ('2018-12-26');
    `);
  });
};
