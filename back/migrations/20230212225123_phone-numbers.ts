// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('phone-numbers', (table) => {
    table.increments('id')
    table.string('type')
    table.string('phone')
    table.integer('contact_id').unsigned().references('id').inTable('contacts')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('phone-numbers')
}
