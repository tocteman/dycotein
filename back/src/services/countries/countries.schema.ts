// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const countriesSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    flag: Type.String()
  },
  { $id: 'Countries', additionalProperties: false }
)
export type Countries = Static<typeof countriesSchema>
export const countriesValidator = getValidator(countriesSchema, dataValidator)
export const countriesResolver = resolve<Countries, HookContext>({})

export const countriesExternalResolver = resolve<Countries, HookContext>({})

// Schema for creating new entries
export const countriesDataSchema = Type.Pick(countriesSchema, ['name'], {
  $id: 'CountriesData'
})
export type CountriesData = Static<typeof countriesDataSchema>
export const countriesDataValidator = getValidator(countriesDataSchema, dataValidator)
export const countriesDataResolver = resolve<Countries, HookContext>({})

// Schema for updating existing entries
export const countriesPatchSchema = Type.Partial(countriesDataSchema, {
  $id: 'CountriesPatch'
})
export type CountriesPatch = Static<typeof countriesPatchSchema>
export const countriesPatchValidator = getValidator(countriesPatchSchema, dataValidator)
export const countriesPatchResolver = resolve<Countries, HookContext>({})

// Schema for allowed query properties
export const countriesQueryProperties = Type.Pick(countriesSchema, ['id', 'name'])
export const countriesQuerySchema = Type.Intersect(
  [
    querySyntax(countriesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CountriesQuery = Static<typeof countriesQuerySchema>
export const countriesQueryValidator = getValidator(countriesQuerySchema, queryValidator)
export const countriesQueryResolver = resolve<CountriesQuery, HookContext>({})
