// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Countries,
  CountriesData,
  CountriesPatch,
  CountriesQuery,
  CountriesService
} from './countries.class'

export type { Countries, CountriesData, CountriesPatch, CountriesQuery }

export type CountriesClientService = Pick<
  CountriesService<Params<CountriesQuery>>,
  (typeof countriesMethods)[number]
>

export const countriesPath = 'countries'

export const countriesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const countriesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(countriesPath, connection.service(countriesPath), {
    methods: countriesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [countriesPath]: CountriesClientService
  }
}
