// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  phoneNumbersDataValidator,
  phoneNumbersPatchValidator,
  phoneNumbersQueryValidator,
  phoneNumbersResolver,
  phoneNumbersExternalResolver,
  phoneNumbersDataResolver,
  phoneNumbersPatchResolver,
  phoneNumbersQueryResolver
} from './phone-numbers.schema'

import type { Application } from '../../declarations'
import { PhoneNumbersService, getOptions } from './phone-numbers.class'
import { phoneNumbersPath, phoneNumbersMethods } from './phone-numbers.shared'

export * from './phone-numbers.class'
export * from './phone-numbers.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const phoneNumbers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(phoneNumbersPath, new PhoneNumbersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: phoneNumbersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(phoneNumbersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(phoneNumbersExternalResolver),
        schemaHooks.resolveResult(phoneNumbersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(phoneNumbersQueryValidator),
        schemaHooks.resolveQuery(phoneNumbersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(phoneNumbersDataValidator),
        schemaHooks.resolveData(phoneNumbersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(phoneNumbersPatchValidator),
        schemaHooks.resolveData(phoneNumbersPatchResolver)
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
    [phoneNumbersPath]: PhoneNumbersService
  }
}
