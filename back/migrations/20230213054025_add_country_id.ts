import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('contacts', (table) => {
    table.integer('country_id').unsigned().references('id').inTable('countries')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('contacts', (table) => {
    table.dropColumn('country_id')
  })
}

