import { contact } from './contacts/contacts'
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(contact)
}

