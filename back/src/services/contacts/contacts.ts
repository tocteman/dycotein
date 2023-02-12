import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  contactDataValidator,
  contactPatchValidator,
  contactQueryValidator,
  contactResolver,
  contactDataResolver,
  contactPatchResolver,
  contactQueryResolver
} from './contacts.schema'

import type { Application } from '../../declarations'
import { ContactService, getOptions } from './contacts.class'
import { contactPath, contactMethods } from './contacts.shared'

export * from './contacts.class'
export * from './contacts.schema'

export const contact = (app: Application) => {
  app.use(contactPath, new ContactService(getOptions(app)), {
    methods: contactMethods,
  })

  app.service(contactPath).hooks({
    around: {
      all: [schemaHooks.resolveResult(contactResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(contactQueryValidator), schemaHooks.resolveQuery(contactQueryResolver)],
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
    [contactPath]: ContactService
  }
}

