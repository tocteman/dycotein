import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Contact, ContactData, ContactPatch, ContactQuery } from './contacts.schema'

export type { Contact, ContactData, ContactPatch, ContactQuery }

export interface ContactParams extends KnexAdapterParams<ContactQuery> {}

export class ContactService<ServiceParams extends Params = ContactParams> extends KnexService<
  Contact,
  ContactData,
  ServiceParams,
  ContactPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'contacts'
  }
}

