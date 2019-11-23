import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  // Create new table for companies
  return knex.schema.createTable('companies', (table) => {
    table.increments('id').primary()
    table.string('name')
  })
  
  // Create foreign key in users
  .alterTable('users', (table) => {
    table.integer('company').defaultTo(null)
    table.foreign('company').references('companies.id')
  })
}


export async function down(knex: Knex): Promise<any> {
  return knex.raw(`DROP TABLE companies CASCADE;`);
}

