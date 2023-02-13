// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  PhoneNumbers,
  PhoneNumbersData,
  PhoneNumbersPatch,
  PhoneNumbersQuery,
  PhoneNumbersService
} from './phone-numbers.class'

export type { PhoneNumbers, PhoneNumbersData, PhoneNumbersPatch, PhoneNumbersQuery }

export type PhoneNumbersClientService = Pick<
  PhoneNumbersService<Params<PhoneNumbersQuery>>,
  (typeof phoneNumbersMethods)[number]
>

export const phoneNumbersPath = 'phone-numbers'

export const phoneNumbersMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const phoneNumbersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(phoneNumbersPath, connection.service(phoneNumbersPath), {
    methods: phoneNumbersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [phoneNumbersPath]: PhoneNumbersClientService
  }
}
