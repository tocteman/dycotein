import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

export const contactSchema = Type.Object(
  {
    id: Type.Number(),
    first_name: Type.String(),
    last_name: Type.String()
  },
  { $id: 'Contact', additionalProperties: false }
)

export type Contact = Static<typeof contactSchema>
export type contactValidator = getValidator(contactSchema, dataValidator)
export const contactResolver = resolve<Contact, HookContext>({})

export const contactDataSchema = Type.Pick(contactSchema, ['first_name, last_name'], {
  $id: 'ContactData',
  additionalProperties: false
})

export type ContactData = Static<typeof contactDataSchema>
export const contactDataValidator = getValidator(contactDataSchema, dataValidator)

export const contactDataResolver = resolve<Contact, HookContext>({
})


export type ContactPatch = Static<typeof contactPatchSchema>
export const contactPatchValidator = getValidator(contactPatchSchema, dataValidator)
export const contactPatchResolver = resolve<Contact, HookContext>({ })

export const contactQueryProperties = Type.Pick(contactSchema, ['id', 'email'])
export const contactQuerySchema = Type.Intersect(
  [
    querySyntax(contactQueryProperties),
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ContactQuery = Static<typeof contactQuerySchema>
export const contactQueryValidator = getValidator(contactQuerySchema, queryValidator)
export const contactQueryResolver = resolve<ContactQuery, HookContext>({
})
