import { useState, useEffect } from 'react'
import { apiPost } from '../lib/fetcher'
import { useLocation } from 'wouter'
import toast from 'react-hot-toast'
import ContactPageTitle from '../components/ContactPageTitle'

const AddContactPage = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nationality, setNationality] = useState("")
  const [location, setLocation] = useLocation()
  
  const add = () => {
    apiPost('contact', payload)
    .then(res => {
      toast.success("Contacto añadido")
    })
  }
  return (
    <div className="flex flex-col space-y-6">
      <ContactPageTitle title="Añadir Contacto"/>
      <form onSubmit={add}>
        <div className="input-group">
          <label htmlFor="first-name">Nombre</label>
          <input
          type="text"
          name="first-name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="first-name">Apellido</label>
          <input
          type="text"
          name="last-name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          />
        </div>
      </form>
    </div>
  )

}

export default AddContactPage

