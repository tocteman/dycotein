import { phoneNumbers } from './phone-numbers/phone-numbers'
import { countries } from './countries/countries'
import { contacts } from './contacts/contacts'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(phoneNumbers)
  app.configure(countries)
  app.configure(contacts)
  app.configure(user)
  // All services will be registered here
}
