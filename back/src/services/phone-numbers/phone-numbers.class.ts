// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  PhoneNumbers,
  PhoneNumbersData,
  PhoneNumbersPatch,
  PhoneNumbersQuery
} from './phone-numbers.schema'

export type { PhoneNumbers, PhoneNumbersData, PhoneNumbersPatch, PhoneNumbersQuery }

export interface PhoneNumbersParams extends KnexAdapterParams<PhoneNumbersQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class PhoneNumbersService<ServiceParams extends Params = PhoneNumbersParams> extends KnexService<
  PhoneNumbers,
  PhoneNumbersData,
  ServiceParams,
  PhoneNumbersPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'phone-numbers'
  }
}
