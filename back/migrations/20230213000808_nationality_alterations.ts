import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  
  await knex.schema.alterTable('countries', (table) => {
    table.string('flag')
  })
  await knex.schema.alterTable('users', (table) => {
    table.integer('country_id').unsigned().references('id').inTable('countries')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('countries', (table) => {
    table.dropColumn('flag')
  })
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('country_id')
  })
}

