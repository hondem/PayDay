import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.withSchema('m')
    .createTable('zlozky', (table => {
      table.increments('id').primary(),
      table.integer('os_id').notNullable().references('id').inTable('m.osoba'),
      table.integer('kod').notNullable().references('id').inTable('m.kody'),
      table.string("kod_ext", 10).notNullable,
      table.date("datum_od").notNullable,
      table.date("datum_do").notNullable,
      table.float("dni").notNullable,
      table.float("hod").notNullable,
      table.float("sadzba").notNullable,
      table.float("suma").notNullable,
      table.string("pozn", 30)
    }))
}


export async function down(knex: Knex): Promise<any> {
}

