// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Countries, CountriesData, CountriesPatch, CountriesQuery } from './countries.schema'

export type { Countries, CountriesData, CountriesPatch, CountriesQuery }

export interface CountriesParams extends KnexAdapterParams<CountriesQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class CountriesService<ServiceParams extends Params = CountriesParams> extends KnexService<
  Countries,
  CountriesData,
  ServiceParams,
  CountriesPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mysqlClient'),
    name: 'countries'
  }
}
