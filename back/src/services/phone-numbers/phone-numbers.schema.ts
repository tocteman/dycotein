// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { virtual, resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { contactsSchema } from '../contacts/contacts'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const phoneNumbersSchema = Type.Object(
  {
    id: Type.Number(),
    type: Type.String(),
    phone: Type.String(),
    contact_id: Type.Number(),
    contact: Type.Ref(contactsSchema)
  },
  { $id: 'PhoneNumbers', additionalProperties: false}
)
export type PhoneNumbers = Static<typeof phoneNumbersSchema>
export const phoneNumbersValidator = getValidator(phoneNumbersSchema, dataValidator)
export const phoneNumbersResolver = resolve<PhoneNumbers, HookContext>({})

export const phoneNumbersExternalResolver = resolve<PhoneNumbers, HookContext>({})

// Schema for creating new entries
export const phoneNumbersDataSchema = Type.Pick(phoneNumbersSchema, ['phone', 'contact_id'], {
  $id: 'PhoneNumbersData'
})
export type PhoneNumbersData = Static<typeof phoneNumbersDataSchema>
export const phoneNumbersDataValidator = getValidator(phoneNumbersDataSchema, dataValidator)
export const phoneNumbersDataResolver = resolve<PhoneNumbers, HookContext>({})

// Schema for updating existing entries
export const phoneNumbersPatchSchema = Type.Partial(phoneNumbersDataSchema, {
  $id: 'PhoneNumbersPatch'
})
export type PhoneNumbersPatch = Static<typeof phoneNumbersPatchSchema>
export const phoneNumbersPatchValidator = getValidator(phoneNumbersPatchSchema, dataValidator)
export const phoneNumbersPatchResolver = resolve<PhoneNumbers, HookContext>({})

// Schema for allowed query properties
export const phoneNumbersQueryProperties = Type.Pick(phoneNumbersSchema, ['id', 'phone', 'contact_id'])
export const phoneNumbersQuerySchema = Type.Intersect(
  [
    querySyntax(phoneNumbersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PhoneNumbersQuery = Static<typeof phoneNumbersQuerySchema>
export const phoneNumbersQueryValidator = getValidator(phoneNumbersQuerySchema, queryValidator)
export const phoneNumbersQueryResolver = resolve<PhoneNumbersQuery, HookContext>({})
