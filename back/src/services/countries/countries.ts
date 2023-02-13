// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  countriesDataValidator,
  countriesPatchValidator,
  countriesQueryValidator,
  countriesResolver,
  countriesExternalResolver,
  countriesDataResolver,
  countriesPatchResolver,
  countriesQueryResolver
} from './countries.schema'

import type { Application } from '../../declarations'
import { CountriesService, getOptions } from './countries.class'
import { countriesPath, countriesMethods } from './countries.shared'

export * from './countries.class'
export * from './countries.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const countries = (app: Application) => {
  // Register our service on the Feathers application
  app.use(countriesPath, new CountriesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: countriesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(countriesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(countriesExternalResolver),
        schemaHooks.resolveResult(countriesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(countriesQueryValidator),
        schemaHooks.resolveQuery(countriesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(countriesDataValidator),
        schemaHooks.resolveData(countriesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(countriesPatchValidator),
        schemaHooks.resolveData(countriesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [countriesPath]: CountriesService
  }
}
