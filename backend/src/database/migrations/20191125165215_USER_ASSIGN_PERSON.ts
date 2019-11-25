import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.integer('profile').defaultTo(null)
    table.foreign('profile').references('id').inTable('m.osoba')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('profile')
  })
}

