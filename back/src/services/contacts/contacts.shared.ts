import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Contact, ContactData, ContactPatch, ContactQuery, ContactService } from './contacts.class'

export type { Contact, ContactData, ContactPatch, ContactQuery }

export type ContactClientService = Pick<ContactService<Params<ContactQuery>>, (typeof contactMethods)[number]>

export const contactPath = 'contacts'

export const contactMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const contactClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(contactPath, connection.service(contactPath), {
    methods: contactMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [contactPath]: ContactClientService
  }
}

