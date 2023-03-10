// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Contacts, ContactsData, ContactsPatch, ContactsQuery } from './contacts.schema'

export type { Contacts, ContactsData, ContactsPatch, ContactsQuery }

export interface ContactsParams extends KnexAdapterParams<ContactsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ContactsService<ServiceParams extends Params = ContactsParams> extends KnexService<
  Contacts,
  ContactsData,
  ServiceParams,
  ContactsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'contacts'
  }
}
