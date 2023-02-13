// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { virtual, resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import { phoneNumbersSchema } from '../phone-numbers/phone-numbers.schema'
import { countriesSchema } from '../countries/countries'
import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const contactsSchema = Type.Object(
  {
    id: Type.Number(),
    first_name: Type.String(),
    last_name: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String(),
    phoneNumbers: Type.Optional(Type.Any()),
    country_id: Type.String(),
    nationality: Type.Ref(countriesSchema),
    // phoneNumbers: Type.Ref(phoneNumbersSchema)
  },
  { $id: 'Contacts', additionalProperties: true }
)

export type Contacts = Static<typeof contactsSchema>
export const contactsValidator = getValidator(contactsSchema, dataValidator)
export const contactsResolver = resolve<Contacts, HookContext>({
  phoneNumbers: virtual(async (message, context) => {
    const phones = await context.app.service('phone-numbers').find({
      query: {
        contact_id: message.id
      }
    }) ?? undefined
    return phones.data?.length > 0 ? phones : undefined
  })
})

export const contactsExternalResolver = resolve<Contacts, HookContext>({})

// Schema for creating new entries
export const contactsDataSchema = Type.Pick(contactsSchema, ['first_name', 'last_name', 'country_id'], {
  $id: 'ContactsData'
})
export type ContactsData = Static<typeof contactsDataSchema>
export const contactsDataValidator = getValidator(contactsDataSchema, dataValidator)
export const contactsDataResolver = resolve<Contacts, HookContext>({
  created_at: async () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
})

// Schema for updating existing entries
export const contactsPatchSchema = Type.Partial(contactsDataSchema, {
  $id: 'ContactsPatch'
})
export type ContactsPatch = Static<typeof contactsPatchSchema>
export const contactsPatchValidator = getValidator(contactsPatchSchema, dataValidator)
export const contactsPatchResolver = resolve<Contacts, HookContext>({})

// Schema for allowed query properties
export const contactsQueryProperties = Type.Pick(contactsSchema, ['id', 'first_name', 'last_name', 'created_at', 'country_id'])
export const contactsQuerySchema = Type.Intersect(
  [
    querySyntax(contactsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ContactsQuery = Static<typeof contactsQuerySchema>
export const contactsQueryValidator = getValidator(contactsQuerySchema, queryValidator)
export const contactsQueryResolver = resolve<ContactsQuery, HookContext>({})
