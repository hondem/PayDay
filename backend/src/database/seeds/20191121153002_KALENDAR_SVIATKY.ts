import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
  return knex("m.kalendar_sviatky")
    .del()
    .then(() => {
      return knex.raw(`
      INSERT INTO m.kalendar_sviatky VALUES 
        ('2018-01-01'),
        ('2018-01-06'),
        ('2018-12-24'),
        ('2018-12-25'),
        ('2018-12-26'),
        ('2019-01-01'),
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
        ('2020-01-01'),
        ('2020-01-06'),
        ('2020-04-19'),
        ('2020-04-22'),
        ('2020-05-01'),
        ('2020-05-08'),
        ('2020-07-05'),
        ('2020-08-29'),
        ('2020-11-01'),
        ('2020-11-17'),
        ('2020-12-24'),
        ('2020-12-25'),
        ('2020-12-26'),
        ('2021-01-01'),
        ('2021-01-06'),
        ('2021-12-24'),
        ('2021-12-25'),
        ('2021-12-26'),
        ('2022-04-19'),
        ('2022-04-22'),
        ('2022-05-01'),
        ('2022-05-08'),
        ('2022-07-05'),
        ('2022-08-29'),
        ('2022-11-01'),
        ('2022-11-17'),
        ('2022-01-01'),
        ('2022-01-06'),
        ('2022-12-24'),
        ('2022-12-25'),
        ('2022-12-26');
    `);
    });
}
